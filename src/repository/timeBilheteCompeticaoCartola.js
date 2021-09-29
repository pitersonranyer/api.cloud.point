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


const getTimesDaCompeticao = async (nrSequencialRodadaCartola) => {

  result = await sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
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
    " , `competicaoCartola`.`idUsuarioAdmLiga` " +
    " , `competicaoCartola`.`nomeLiga` " +
    " , `competicaoCartola`.`anoTemporada` " +
    " , `competicaoCartola`.`nrRodada` " +
    " , `competicaoCartola`.`dataFimInscricao` " +
    " , `competicaoCartola`.`horaFimInscricao` " +
    " , `competicaoCartola`.`valorCompeticao` " +
    " , `competicaoCartola`.`txAdm` " +
    " , `competicaoCartola`.`statusCompeticao` " +
    " , `competicaoCartola`.`tipoCompeticao` " +
    " , `competicaoCartola`.`linkGrupoWapp` " +
    " , `competicaoCartola`.`prioridadeConsulta` " +
    " FROM `bilheteCompeticaoCartola` " +
    "   LEFT OUTER JOIN `timeBilheteCompeticaoCartola` " +
    "   ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilheteCompeticaoCartola`.`idBilhete`  " +
    "   INNER JOIN `competicaoCartola` " +
    "   ON `competicaoCartola`.`nrSequencialRodadaCartola` = `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
    " AND `bilheteCompeticaoCartola`.`statusAtualBilhete` = 'Pago' " +
    " ORDER BY `timeBilheteCompeticaoCartola`.`pontuacaoParcial` DESC "

    , {
      type: sequelize.QueryTypes.SELECT
    });

  if (result.length > 0) {

    for (let i = 0; i < result.length; i++) {


      if (result[i].tipoCompeticao === 'TIRO CURTO') {
        premiacaoTotal = result.length * result[i].valorCompeticao;
        premiacaoPercentualLista = 0;
        premiacaoFinalLista = 0;
        result[i].premiacaoFinalFormatLista = '';
        if (i === 0) {
          premiacaoPercentualLista = (premiacaoTotal * 50) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 1) {
          premiacaoPercentualLista = (premiacaoTotal * 15) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 2) {
          premiacaoPercentualLista = (premiacaoTotal * 7) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 3) {
          premiacaoPercentualLista = (premiacaoTotal * 6) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 4) {
          premiacaoPercentualLista = (premiacaoTotal * 4) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 5) {
          premiacaoPercentualLista = (premiacaoTotal * 3) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 6) {
          premiacaoPercentualLista = (premiacaoTotal * 2) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 7) {
          premiacaoPercentualLista = (premiacaoTotal * 1.5) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 8) {
          premiacaoPercentualLista = (premiacaoTotal * 1) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 9) {
          premiacaoPercentualLista = (premiacaoTotal * 0.5) / 100;
          premiacaoFinalLista = premiacaoPercentualLista;
          result[i].premiacaoFinalFormatLista = premiacaoFinalLista.toLocaleString('pt-br', { minimumFractionDigits: 2 });
        }
        if (i === 10) {
          result[i].premiacaoFinalFormatLista = 'FREE';
        }
        if (i === 11) {
          result[i].premiacaoFinalFormatLista = 'FREE';
        }
        if (i === 12) {
          result[i].premiacaoFinalFormatLista = 'FREE';
        }
        if (i === 13) {
          result[i].premiacaoFinalFormatLista = 'FREE';
        }
        if (i === 14) {
          result[i].premiacaoFinalFormatLista = 'FREE';
        }

      }


      var idBilhete = result[i].idBilhete
      var time_id = result[i].time_id
      var colocacao = i + 1;

      TimeBilheteCompeticaoCartola.update(

        {
          colocacao: colocacao
        },
        {
          where: {
            idBilhete: idBilhete,
            time_id: time_id
          }
        }

      )

    }
   
    return result;
  }else{
    return result = [];
  }

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
  const pontuacaoTotalCompeticao = dadosTimeBilhete.pontuacaoTotalCompeticao

  pontuacaoParcial.toFixed(2);
  pontuacaoTotalCompeticao.toFixed(2);

  return TimeBilheteCompeticaoCartola.update(

    {
      pontuacaoParcial: pontuacaoParcial,
      qtJogadoresPontuados: qtJogadoresPontuados,
      pontuacaoTotalCompeticao: pontuacaoTotalCompeticao
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