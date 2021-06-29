const BilheteCompeticaoCartola = require('../model/bilheteCompeticaoCartola');
const StatusBilheteCompeticaoCartola = require('../model/statusBilheteCompeticaoCartola');
const sequelize = require('../database/database');
const { Op } = require("sequelize");

let data = new Date();
let timesTamp = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
let anoAtual = data.getFullYear();

const cadastrarBilhete = async dadosBilhete => {

  timeBilhete =  await sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    "FROM `bilheteCompeticaoCartola` " +
    "INNER JOIN `timeBilheteCompeticaoCartola`  " +
    "ON `bilheteCompeticaoCartola`.`idBilhete` = `timeBilheteCompeticaoCartola`.`idBilhete` " +
    " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= ${dadosBilhete.nrSequencialRodadaCartola} ` +
    " AND `timeBilheteCompeticaoCartola`.`time_id` " + `= ${dadosBilhete.time_id} `

    , {
      type: sequelize.QueryTypes.SELECT
    });



  if (timeBilhete.length > 0) {
    return false
  } else {



    return BilheteCompeticaoCartola.max('idBilhete').then(max => {

      if (Number.isNaN(max)) {
        let numbersAsString = `${anoAtual}${'00000'}`;
        max = numbersAsString;
        const numMax = max + 1;
        dadosBilhete.idBilhete = numMax;
      } else {
        const numMax = max + 1;
        dadosBilhete.idBilhete = numMax;
      }


      let text = "";
      let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      let codigoBilhete = "pJ" + anoAtual + text;
      dadosBilhete.codigoBilhete = codigoBilhete;


      //Gravar bilhete
      dadosBilhete.statusAtualBilhete = 'Gerado';
      const bilheteCompeticaoCartola = new BilheteCompeticaoCartola({ ...dadosBilhete });
      bilheteCompeticaoCartola.save();

      const dadosStatusBilhete = {
        idBilhete: dadosBilhete.idBilhete,
        dataHoraAtualizacaoBilhete: timesTamp,
        statusBilhete: 'Gerado',
        respAtualizacaoBilhete: dadosBilhete.nomeUsuario,
        nrSequencialRodadaCartola: dadosBilhete.nrSequencialRodadaCartola
      };

      //Gravar Status
      const statusBilheteCompeticaoCartola = new StatusBilheteCompeticaoCartola({ ...dadosStatusBilhete });
      statusBilheteCompeticaoCartola.save();

      const retDados = {
        idBilhete: dadosBilhete.idBilhete,
        codigoBilhete: dadosBilhete.codigoBilhete
      };

      return retDados;

    });

  }

};


const getBilheteGerado = () => {
  return sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    " , `bilheteCompeticaoCartola`.`codigoBilhete` " +
    " , `bilheteCompeticaoCartola`.`nomeUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrContatoUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    " , `bilheteCompeticaoCartola`.`statusAtualBilhete` " +
    " , `competicaoCartola`.`idUsuarioAdmLiga` " +
    " , `competicaoCartola`.`nomeLiga` " +
    " , `competicaoCartola`.`anoTemporada` " +
    " , `competicaoCartola`.`nrRodada` " +
    " , `competicaoCartola`.`dataFimInscricao` " +
    " , `competicaoCartola`.`horaFimInscricao` " +
    " , `competicaoCartola`.`valorCompeticao` " +
    " , `competicaoCartola`.`statusCompeticao` " +
    " , `competicaoCartola`.`tipoCompeticao` " +
    " FROM `bilheteCompeticaoCartola` " +
    " INNER JOIN `competicaoCartola` " +
    " ON `competicaoCartola`.`nrSequencialRodadaCartola` = `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola`  " +
    " WHERE `bilheteCompeticaoCartola`.`statusAtualBilhete`  = 'Finalizado' " +
    " ORDER BY `bilheteCompeticaoCartola`.`idBilhete` "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data;
      }
    });
};

const getBilheteGeradoId = (idUsuarioAdmLiga) => {

  return sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    " , `bilheteCompeticaoCartola`.`codigoBilhete` " +
    " , `bilheteCompeticaoCartola`.`nomeUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrContatoUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    " , `bilheteCompeticaoCartola`.`statusAtualBilhete` " +
    " , `competicaoCartola`.`idUsuarioAdmLiga` " +
    " , `competicaoCartola`.`nomeLiga` " +
    " , `competicaoCartola`.`anoTemporada` " +
    " , `competicaoCartola`.`nrRodada` " +
    " , `competicaoCartola`.`dataFimInscricao` " +
    " , `competicaoCartola`.`horaFimInscricao` " +
    " , `competicaoCartola`.`valorCompeticao` " +
    " , `competicaoCartola`.`statusCompeticao` " +
    " , `competicaoCartola`.`tipoCompeticao` " +
    " FROM `bilheteCompeticaoCartola` " +
    " INNER JOIN `competicaoCartola` " +
    " ON `competicaoCartola`.`nrSequencialRodadaCartola` = `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola`  " +
    " WHERE `bilheteCompeticaoCartola`.`statusAtualBilhete`  = 'Finalizado' " +
    " and   `competicaoCartola`.`idUsuarioAdmLiga` " + `= ${idUsuarioAdmLiga} ` +
    " ORDER BY `bilheteCompeticaoCartola`.`idBilhete` "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data;
      }
    });
};


const putStatusBilhete = dadosBilhete => {

  const dataPut = new Date();
  const timesTampPut = new Date(dataPut.valueOf() - dataPut.getTimezoneOffset() * 60000);

  const idBilhete = dadosBilhete.idBilhete;
  const nrSequencialRodadaCartola = dadosBilhete.nrSequencialRodadaCartola;
  const statusAtualBilhete = dadosBilhete.statusAtualBilhete;

  return BilheteCompeticaoCartola.update(
    { statusAtualBilhete: statusAtualBilhete },
    {
      where: {
        idBilhete: idBilhete,
        nrSequencialRodadaCartola: nrSequencialRodadaCartola
      }
    }
  ).then(function (updatedRecord) {
    if (updatedRecord) {

      if (dadosBilhete.nomeUsuario === null) {
        dadosBilhete.nomeUsuario = 'Sistema';
      }

      const dadosStatusBilhete = {
        idBilhete: dadosBilhete.idBilhete,
        dataHoraAtualizacaoBilhete: timesTampPut,
        statusBilhete: dadosBilhete.statusAtualBilhete,
        respAtualizacaoBilhete: dadosBilhete.nomeUsuario,
        nrSequencialRodadaCartola: dadosBilhete.nrSequencialRodadaCartola
      };




      //Gravar Status
      const statusCompeticaoCartola = new StatusBilheteCompeticaoCartola({ ...dadosStatusBilhete });
      statusCompeticaoCartola.save();

      return true;
    }
    else {
      return false;
    }
  });
};



const delBilhete = (idBilhete) => {
  return BilheteCompeticaoCartola.destroy({
    where:
    {
      idBilhete: idBilhete,
    }
  })
    .then(function (deletedRecord) {
      if (deletedRecord >= 1) {

        return StatusBilheteCompeticaoCartola.destroy({
          where:
          {
            idBilhete: idBilhete,
          }
        })
          .then(function (deletedRecord) {
            if (deletedRecord >= 1) {
              return true;
            }
            else {
              return false;
            }
          }).catch(function (error) {
            return false;
          });

      }
      else {
        return false;
      }
    }).catch(function (error) {
      return false;
    });

};


module.exports = {
  cadastrarBilhete,
  getBilheteGerado,
  putStatusBilhete,
  getBilheteGeradoId,
  delBilhete
};
