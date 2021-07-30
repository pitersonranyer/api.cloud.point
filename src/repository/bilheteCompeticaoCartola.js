const BilheteCompeticaoCartola = require('../model/bilheteCompeticaoCartola');
const StatusBilheteCompeticaoCartola = require('../model/statusBilheteCompeticaoCartola');
const TimeBilheteCompeticaoCartola = require('../model/timeBilheteCompeticaoCartola');
const HistoricoTimeUsuario = require('../model/historicoTimeUsuario');
const sequelize = require('../database/database');
const { Op } = require("sequelize");

let data = new Date();
let timesTamp = new Date(data.valueOf() - data.getTimezoneOffset() * 60000);
let anoAtual = data.getFullYear();
let index = 0;

let retDados = {
  idBilhete: 0,
  codigoBilhete: ''
};

var unirest = require("unirest");
const BASE_URL = 'https://api.cartolafc.globo.com';


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

    if (dadosBilhete.idBilhete === 0) {

      max = await sequelize.query("SELECT max(idBilhete)  as `max` " +
        "FROM `bilheteCompeticaoCartola` "

        , {
          type: sequelize.QueryTypes.SELECT
        });

      if (Number.isNaN(max[0].max)) {
        let numbersAsString = `${anoAtual}${'00000'}`;
        max[0].max = numbersAsString;
        const numMax = max[0].max + 1;
        dadosBilhete.idBilhete = numMax;
      } else {
        const numMax = max[0].max + 1;
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

      historico = await sequelize.query("SELECT COUNT(*) as `count`" +
        "FROM `historicoTimeUsuario` " +
        " WHERE `historicoTimeUsuario`.`nrContatoUsuario` " + `= '${dadosHistorico.nrContatoUsuario}' ` +
        " AND   `historicoTimeUsuario`.`time_id` " + `= ${dadosHistorico.time_id} `
        , {
          type: sequelize.QueryTypes.SELECT
        });


      if (historico[0].count === 0) {
        //Gravar Historico
        const historicoTimeUsuario = new HistoricoTimeUsuario({ ...dadosHistorico });
        historicoTimeUsuario.save();

      }


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



      const timeBilheteCompeticaoCartola = new TimeBilheteCompeticaoCartola({ ...dadosSomenteTimeBilhete });
      timeBilheteCompeticaoCartola.save();

      // Salvar Historico time bilhete
      const dadosHistorico = {
        nrContatoUsuario: dadosBilhete.nrContatoUsuario,
        nomeUsuario: dadosBilhete.nomeUsuario,
        time_id: dadosBilhete.time_id,

      };

      historico = await sequelize.query("SELECT COUNT(*) as `count`" +
        "FROM `historicoTimeUsuario` " +
        " WHERE `historicoTimeUsuario`.`nrContatoUsuario` " + `= '${dadosHistorico.nrContatoUsuario}' ` +
        " AND   `historicoTimeUsuario`.`time_id` " + `= ${dadosHistorico.time_id} `
        , {
          type: sequelize.QueryTypes.SELECT
        });


      if (historico[0].count === 0) {
        //Gravar Historico
        const historicoTimeUsuario = new HistoricoTimeUsuario({ ...dadosHistorico });
        historicoTimeUsuario.save();
      }


      const retDados = {
        idBilhete: dadosBilhete.idBilhete,
        codigoBilhete: dadosBilhete.codigoBilhete
      };

      return retDados;

    }



  }

};


const cadastrarBilhetePorIds = async dadosBilhete => {

  index = 0;

  for (let i = 0; i < dadosBilhete.length; i++) {
    index = i;

    path = `/time/id/${dadosBilhete[i].time_id}`;
    var url = `${BASE_URL}${path}`;

    // consultarTimeCartola
    resultJson = await unirest.get(url)
      .header(
        "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
        "Accept", "application/json, text/plain, */*",
        "Referer", "https://cartolafc.globo.com/",
        "Origin", "https://cartolafc.globo.com/",
        "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
      )

    if (resultJson.body) {

      dadosTime = resultJson.body.time

      timeBilhete = await sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
        "FROM `bilheteCompeticaoCartola` " +
        "INNER JOIN `timeBilheteCompeticaoCartola`  " +
        "ON `bilheteCompeticaoCartola`.`idBilhete` = `timeBilheteCompeticaoCartola`.`idBilhete` " +
        " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= ${dadosBilhete[i].nrSequencialRodadaCartola} ` +
        " AND `timeBilheteCompeticaoCartola`.`time_id` " + `= ${dadosBilhete[i].time_id} `

        , {
          type: sequelize.QueryTypes.SELECT
        });

      if (timeBilhete.length > 0) {
        return false
      } else {

        if (index === 0) { // gerar numero solicitação na primeira passagem

          if (dadosBilhete[index].idBilhete === 0) { // gerar apenas quando nao for informado.

            max = await sequelize.query("SELECT max(idBilhete)  as `max` " +
              "FROM `bilheteCompeticaoCartola` "

              , {
                type: sequelize.QueryTypes.SELECT
              });

            if (Number.isNaN(max[0].max)) {
              let numbersAsString = `${anoAtual}${'00000'}`;
              max[0].max = numbersAsString;
              const numMax = max[0].max + 1;
              dadosBilhete[index].idBilhete = numMax;
            } else {
              const numMax = max[0].max + 1;
              dadosBilhete[index].idBilhete = numMax;
            }

            let text = "";
            let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

            for (let x = 0; x < 6; x++)
              text += possible.charAt(Math.floor(Math.random() * possible.length));

            let codigoBilhete = "pJ" + anoAtual + text;
            dadosBilhete[index].codigoBilhete = codigoBilhete;
          }

          dadosBilhete[index].nomeUsuario = dadosTime.nome_cartola;
          dadosBilhete[index].statusAtualBilhete = 'Gerado';

          //Gravar bilhete
          const bilheteCompeticaoCartola = new BilheteCompeticaoCartola({ ...dadosBilhete[index] });
          bilheteCompeticaoCartola.save();

          retDados.idBilhete = dadosBilhete[index].idBilhete;
          retDados.codigoBilhete = dadosBilhete[index].codigoBilhete;

          //Gravar Status
          const dadosStatusBilhete = {
            idBilhete: dadosBilhete[index].idBilhete,
            dataHoraAtualizacaoBilhete: timesTamp,
            statusBilhete: 'Gerado',
            respAtualizacaoBilhete: dadosTime.nome_cartola,
            nrSequencialRodadaCartola: dadosBilhete[index].nrSequencialRodadaCartola
          };


          const statusBilheteCompeticaoCartola = new StatusBilheteCompeticaoCartola({ ...dadosStatusBilhete });
          statusBilheteCompeticaoCartola.save();


        }


        //Gravar Timebilhete
        const dadosSomenteTimeBilhete = {
          idBilhete: retDados.idBilhete,
          time_id: dadosBilhete[index].time_id,
          assinante: dadosTime.assinante,
          foto_perfil: dadosTime.foto_perfil,
          nome: dadosTime.nome,
          nome_cartola: dadosTime.nome_cartola,
          slug: dadosTime.slug,
          url_escudo_png: dadosTime.url_escudo_png,
          url_escudo_svg: dadosTime.url_escudo_svg,
          facebook_id: dadosTime.facebook_id,
        };

        // Salvar dados do Timebilhete
        const timeBilheteCompeticaoCartola = new TimeBilheteCompeticaoCartola({ ...dadosSomenteTimeBilhete });
        timeBilheteCompeticaoCartola.save();

        // Salvar Historico time bilhete
        const dadosHistorico = {
          nrContatoUsuario: dadosBilhete[index].nrContatoUsuario,
          nomeUsuario: dadosTime.nome_cartola,
          time_id: dadosBilhete[index].time_id,

        };


        historico = await sequelize.query("SELECT COUNT(*) as `count`" +
          "FROM `historicoTimeUsuario` " +
          " WHERE `historicoTimeUsuario`.`nrContatoUsuario` " + `= '${dadosHistorico.nrContatoUsuario}' ` +
          " AND   `historicoTimeUsuario`.`time_id` " + `= ${dadosHistorico.time_id} `
          , {
            type: sequelize.QueryTypes.SELECT
          });


        if (historico[0].count === 0) {
          //Gravar Historico
          const historicoTimeUsuario = new HistoricoTimeUsuario({ ...dadosHistorico });
          historicoTimeUsuario.save();

        }


      }

    } else {
      if (index === 0){
        return false;
      }else{
        return true;
      }
      
    }

  }

  return retDados;

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
  delBilhete,
  cadastrarBilhetePorIds
};