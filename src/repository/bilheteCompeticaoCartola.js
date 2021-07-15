const BilheteCompeticaoCartola = require('../model/bilheteCompeticaoCartola');
const StatusBilheteCompeticaoCartola = require('../model/statusBilheteCompeticaoCartola');
const TimeBilheteCompeticaoCartola = require('../model/timeBilheteCompeticaoCartola');
const HistoricoTimeUsuario = require('../model/historicoTimeUsuario');
const sequelize = require('../database/database');
const { Op } = require("sequelize");

let data = new Date();
let timesTamp = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
let anoAtual = data.getFullYear();

const cadastrarBilheteMobile = async dadosBilhete => {

  timeBilhete = await sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
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

    console.log('dadossssssssssss', dadosBilhete.idBilhete);
    if (dadosBilhete.idBilhete === 0) {

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

        //Gravar Timebilhete
        const dadosSomenteTimeBilhete = {
          idBilhete: dadosBilhete.idBilhete,
          time_id: dadosBilhete.time_id,
          assinante: dadosBilhete.assinante,
          foto_perfil: dadosBilhete.foto_perfil,
          nome: dadosBilhete.nome,
          nome_cartola: dadosBilhete.nome_cartola,
          slug: dadosBilhete.slug,
          url_escudo_png: dadosBilhete.url_escudo_png,
          url_escudo_svg: dadosBilhete.url_escudo_svg,
          facebook_id: dadosBilhete.facebook_id,
        };


        // Salvar dados do Timebilhete
        const timeBilheteCompeticaoCartola = new TimeBilheteCompeticaoCartola({ ...dadosSomenteTimeBilhete });
        timeBilheteCompeticaoCartola.save();

        // Salvar Historico time bilhete
        const dadosHistorico = {
          nrContatoUsuario: dadosBilhete.nrContatoUsuario,
          nomeUsuario: dadosBilhete.nomeUsuario,
          time_id: dadosBilhete.time_id,

        };

        HistoricoTimeUsuario.findOne({
          where:
          {
            nrContatoUsuario: dadosHistorico.nrContatoUsuario,
            time_id: dadosHistorico.time_id
          }
        })
          .then(psq1 => {
            if (psq1 === null) {
              //Gravar Historico
              const historicoTimeUsuario = new HistoricoTimeUsuario({ ...dadosHistorico });
              historicoTimeUsuario.save();

            }

          });


        //Gravar Status
        const dadosStatusBilhete = {
          idBilhete: dadosBilhete.idBilhete,
          dataHoraAtualizacaoBilhete: timesTamp,
          statusBilhete: 'Gerado',
          respAtualizacaoBilhete: dadosBilhete.nomeUsuario,
          nrSequencialRodadaCartola: dadosBilhete.nrSequencialRodadaCartola
        };


        const statusBilheteCompeticaoCartola = new StatusBilheteCompeticaoCartola({ ...dadosStatusBilhete });
        statusBilheteCompeticaoCartola.save();

        const retDados = {
          idBilhete: dadosBilhete.idBilhete,
          codigoBilhete: dadosBilhete.codigoBilhete
        };

        return retDados;

      });
    } else {

      // Salvar dados do Timebilhete

      const dadosSomenteTimeBilhete = {
        idBilhete: dadosBilhete.idBilhete,
        time_id: dadosBilhete.time_id,
        assinante: dadosBilhete.assinante,
        foto_perfil: dadosBilhete.foto_perfil,
        nome: dadosBilhete.nome,
        nome_cartola: dadosBilhete.nome_cartola,
        slug: dadosBilhete.slug,
        url_escudo_png: dadosBilhete.url_escudo_png,
        url_escudo_svg: dadosBilhete.url_escudo_svg,
        facebook_id: dadosBilhete.facebook_id,
      };


      console.log('Salvar dados do Timebilhete')
      const timeBilheteCompeticaoCartola = new TimeBilheteCompeticaoCartola({ ...dadosSomenteTimeBilhete });
      timeBilheteCompeticaoCartola.save();

      // Salvar Historico time bilhete
      console.log('Salvar Historico time bilhete')
      const dadosHistorico = {
        nrContatoUsuario: dadosBilhete.nrContatoUsuario,
        nomeUsuario: dadosBilhete.nomeUsuario,
        time_id: dadosBilhete.time_id,

      };

      console.log('HistoricoTimeUsuario.findOne')
      HistoricoTimeUsuario.findOne({
        where:
        {
          nrContatoUsuario: dadosHistorico.nrContatoUsuario,
          time_id: dadosHistorico.time_id
        }
      })
        .then(psq1 => {
          console.log('psq1', psq1)
          if (psq1 === null) {
            //Gravar Historico
            const historicoTimeUsuario = new HistoricoTimeUsuario({ ...dadosHistorico });
            historicoTimeUsuario.save();

            console.log('//Gravar Historico')

          }

          

        });

        
        const retDados = {
          idBilhete: dadosBilhete.idBilhete,
          codigoBilhete: dadosBilhete.codigoBilhete
        };

        return retDados;

    }

    

  }

};

const cadastrarBilhete = async dadosBilhete => {

  timeBilhete = await sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
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
  cadastrarBilheteMobile,
  getBilheteGerado,
  putStatusBilhete,
  getBilheteGeradoId,
  delBilhete
};
