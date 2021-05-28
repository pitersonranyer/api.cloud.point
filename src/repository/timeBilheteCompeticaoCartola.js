const TimeBilheteCompeticaoCartola = require('../model/timeBilheteCompeticaoCartola');
const HistoricoTimeUsuario = require('../model/historicoTimeUsuario');
const sequelize = require('../database/database');

const { Op } = require("sequelize");

const cadastrarTimeBilhete = dadosTimeBilhete => {



  const dadosSomenteTimeBilhete = {
    idBilhete: dadosTimeBilhete.idBilhete,
    time_id: dadosTimeBilhete.time_id,
    assinante: dadosTimeBilhete.assinante,
    foto_perfil: dadosTimeBilhete.foto_perfil,
    nome: dadosTimeBilhete.nome,
    nome_cartola: dadosTimeBilhete.nome_cartola,
    slug: dadosTimeBilhete.slug,
    url_escudo_png: dadosTimeBilhete.url_escudo_png,
    url_escudo_svg: dadosTimeBilhete.url_escudo_svg,
    facebook_id: dadosTimeBilhete.facebook_id,
  };


  return sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    "FROM `bilheteCompeticaoCartola` " +
    "INNER JOIN `timeBilheteCompeticaoCartola`  " +
    "ON `bilheteCompeticaoCartola`.`idBilhete` = `timeBilheteCompeticaoCartola`.`idBilhete` " +
    " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= ${dadosTimeBilhete.nrSequencialRodadaCartola} ` +
    " AND `timeBilheteCompeticaoCartola`.`time_id` " + `= ${dadosTimeBilhete.time_id} `
    , { type: sequelize.QueryTypes.SELECT }).then(function (psq1) {

      if (!psq1.length) {

        // Salvar dados do Timebilhete
        const timeBilheteCompeticaoCartola = new TimeBilheteCompeticaoCartola({ ...dadosSomenteTimeBilhete });
        timeBilheteCompeticaoCartola.save();


        const dadosHistorico = {
          nrContatoUsuario: dadosTimeBilhete.nrContatoUsuario,
          nomeUsuario: dadosTimeBilhete.nomeUsuario,
          time_id: dadosTimeBilhete.time_id,

        };


        return HistoricoTimeUsuario.findOne({
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
              return true;
            }
            return true;
          });


      } else {
        return false
      }
    });

};


const getTimeBilheteGerado = (nrContatoUsuario, nrSequencialRodadaCartola) => {

  return sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    " , `bilheteCompeticaoCartola`.`codigoBilhete` " +
    " , `bilheteCompeticaoCartola`.`nomeUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrContatoUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    " , `bilheteCompeticaoCartola`.`statusAtualBilhete` " +
    " , `timeBilheteCompeticaoCartola`.`time_id` " +
    " , `timeBilheteCompeticaoCartola`.`assinante` " +
    " , `timeBilheteCompeticaoCartola`.`foto_perfil` " +
    " , `timeBilheteCompeticaoCartola`.`nome` " +
    " , `timeBilheteCompeticaoCartola`.`nome_cartola` " +
    " , `timeBilheteCompeticaoCartola`.`slug` " +
    " , `timeBilheteCompeticaoCartola`.`url_escudo_png` " +
    " , `timeBilheteCompeticaoCartola`.`url_escudo_svg` " +
    " , `timeBilheteCompeticaoCartola`.`facebook_id` " +
    " , `timeBilheteCompeticaoCartola`.`pontuacaoParcial` " +
    " , `timeBilheteCompeticaoCartola`.`pontuacaoTotalCompeticao` " +
    " , `timeBilheteCompeticaoCartola`.`qtJogadoresPontuados` " +
    " , `timeBilheteCompeticaoCartola`.`colocacao` " +
    " FROM `bilheteCompeticaoCartola` " +
    " LEFT OUTER JOIN `timeBilheteCompeticaoCartola` " +
    " ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilheteCompeticaoCartola`.`idBilhete`  " +
    " WHERE `bilheteCompeticaoCartola`.`nrContatoUsuario` " + `= "${nrContatoUsuario}" ` +
    " AND `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
    " AND `bilheteCompeticaoCartola`.`statusAtualBilhete` = 'Gerado' " +
    " ORDER BY `timeBilheteCompeticaoCartola`.`time_id` "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data;
      }
    });
};


const getTimesDaCompeticao = (nrSequencialRodadaCartola) => {

  return sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    " , `bilheteCompeticaoCartola`.`codigoBilhete` " +
    " , `bilheteCompeticaoCartola`.`nomeUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrContatoUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    " , `bilheteCompeticaoCartola`.`statusAtualBilhete` " +
    " , `timeBilheteCompeticaoCartola`.`time_id` " +
    " , `timeBilheteCompeticaoCartola`.`assinante` " +
    " , `timeBilheteCompeticaoCartola`.`foto_perfil` " +
    " , `timeBilheteCompeticaoCartola`.`nome` " +
    " , `timeBilheteCompeticaoCartola`.`nome_cartola` " +
    " , `timeBilheteCompeticaoCartola`.`slug` " +
    " , `timeBilheteCompeticaoCartola`.`url_escudo_png` " +
    " , `timeBilheteCompeticaoCartola`.`url_escudo_svg` " +
    " , `timeBilheteCompeticaoCartola`.`facebook_id` " +
    " , `timeBilheteCompeticaoCartola`.`pontuacaoParcial` " +
    " , `timeBilheteCompeticaoCartola`.`pontuacaoTotalCompeticao` " +
    " , `timeBilheteCompeticaoCartola`.`qtJogadoresPontuados` " +
    " , `timeBilheteCompeticaoCartola`.`colocacao` " +
    " FROM `bilheteCompeticaoCartola` " +
    " LEFT OUTER JOIN `timeBilheteCompeticaoCartola` " +
    " ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilheteCompeticaoCartola`.`idBilhete`  " +
    " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
    " AND `bilheteCompeticaoCartola`.`statusAtualBilhete` = 'Pago' " +
    " ORDER BY `timeBilheteCompeticaoCartola`.`time_id` "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data;
      }
    });
};



const delTimeBilhete = (idBilhete, time_id) => {
  return TimeBilheteCompeticaoCartola.destroy({
    where:
    {
      idBilhete: idBilhete,
      time_id: time_id
    }
  })
    .then(function (deletedRecord) {
      if (deletedRecord === 1) {
        return true;
      }
      else {
        return false;
      }
    }).catch(function (error) {
      return false;
    });

};


// total de inscrintos na competicao
const getTimeCompeticaoCount = (nrSequencialRodadaCartola) => {

  return sequelize.query("SELECT COUNT(*) as `count` " +
    "FROM `bilheteCompeticaoCartola` " +
    "INNER JOIN `timeBilheteCompeticaoCartola`  " +
    "ON `bilheteCompeticaoCartola`.`idBilhete` = `timeBilheteCompeticaoCartola`.`idBilhete` " +
    " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
    " AND `bilheteCompeticaoCartola`.`statusAtualBilhete` = 'Pago' "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data[0].count;
      }
    });

};


const getTimeBilhetePorCodigo = (codigoBilhete) => {
  return sequelize.query(" SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    "      , `bilheteCompeticaoCartola`.`codigoBilhete` " +
    "      , `bilheteCompeticaoCartola`.`nomeUsuario` " +
    "      , `bilheteCompeticaoCartola`.`nrContatoUsuario` " +
    "      , `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    "      , `bilheteCompeticaoCartola`.`statusAtualBilhete` " +
    "      , `timeBilheteCompeticaoCartola`.`time_id` " +
    "      , `timeBilheteCompeticaoCartola`.`assinante` " +
    "      , `timeBilheteCompeticaoCartola`.`foto_perfil` " +
    "      , `timeBilheteCompeticaoCartola`.`nome` " +
    "      , `timeBilheteCompeticaoCartola`.`nome_cartola` " +
    "      , `timeBilheteCompeticaoCartola`.`slug` " +
    "      , `timeBilheteCompeticaoCartola`.`url_escudo_png` " +
    "      , `timeBilheteCompeticaoCartola`.`url_escudo_svg` " +
    "      , `timeBilheteCompeticaoCartola`.`facebook_id` " +
    "      , `timeBilheteCompeticaoCartola`.`pontuacaoParcial` " +
    "      , `timeBilheteCompeticaoCartola`.`pontuacaoTotalCompeticao` " +
    "      , `timeBilheteCompeticaoCartola`.`qtJogadoresPontuados` " +
    "      , `timeBilheteCompeticaoCartola`.`colocacao` " +
    "      , `competicaoCartola`.`idUsuarioAdmLiga` " +
    "      , `competicaoCartola`.`nomeLiga` " +
    "      , `competicaoCartola`.`anoTemporada` " +
    "      , `competicaoCartola`.`nrRodada` " +
    "      , `competicaoCartola`.`dataFimInscricao` " +
    "      , `competicaoCartola`.`horaFimInscricao` " +
    "      , `competicaoCartola`.`valorCompeticao` " +
    "      , `competicaoCartola`.`txAdm` " +
    "      , `competicaoCartola`.`statusCompeticao` " +
    "      , `competicaoCartola`.`tipoCompeticao` " +
    "      , `competicaoCartola`.`linkGrupoWapp` " +
    "      , `competicaoCartola`.`prioridadeConsulta` " +
    "      FROM `bilheteCompeticaoCartola` " +
    "        INNER JOIN `timeBilheteCompeticaoCartola` " +
    "        ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilheteCompeticaoCartola`.`idBilhete` " +
    "        INNER JOIN `competicaoCartola` " +
    "        ON `competicaoCartola`.`nrSequencialRodadaCartola` = `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    "      WHERE `bilheteCompeticaoCartola`.`codigoBilhete` " + `= "${codigoBilhete}" ` +
    "      ORDER BY `timeBilheteCompeticaoCartola`.`pontuacaoParcial` DESC "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data;
      }
    });
};



// Atualizar Pontos parciais da rodada
const putPontosTimeBilhete = dadosTimeBilhete => {
  const idBilhete = dadosTimeBilhete.idBilhete;
  const time_id = dadosTimeBilhete.time_id;

  const pontuacaoParcial = dadosTimeBilhete.pontuacaoParcial
  const qtJogadoresPontuados = dadosTimeBilhete.qtJogadoresPontuados

  pontuacaoParcial.toFixed(2);

  return TimeBilheteCompeticaoCartola.update(

    {
      pontuacaoParcial: pontuacaoParcial,
      qtJogadoresPontuados: qtJogadoresPontuados
    },
    {
      where: {
        idBilhete: idBilhete,
        time_id: time_id
      }
    }

  ).then(function (updatedRecord) {
    if (updatedRecord) {
      return true;
    }
    else {
      return false;
    }
  });
};


module.exports = {
  cadastrarTimeBilhete,
  getTimeBilheteGerado,
  delTimeBilhete,
  getTimesDaCompeticao,
  getTimeCompeticaoCount,
  getTimeBilhetePorCodigo,
  putPontosTimeBilhete
};
