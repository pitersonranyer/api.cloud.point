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


  return TimeBilheteCompeticaoCartola.findOne({
    where:
    {
      idBilhete: dadosTimeBilhete.idBilhete,
      time_id: dadosTimeBilhete.time_id
    }
  })
    .then(psq1 => {
      if (psq1 === null) {

          // Salvar dados do Timebilhete
        const timeBilheteCompeticaoCartola = new TimeBilheteCompeticaoCartola({ ...dadosSomenteTimeBilhete });
        timeBilheteCompeticaoCartola.save();
        return true;

      } else {
          return false
      }
  });

};


const getTimeBilheteGerado = (nrContatoUsuario, nrSequencialRodadaCartola) => {

 return sequelize.query("SELECT `bilhetecompeticaocartola`.`idBilhete` " +
    " , `bilhetecompeticaocartola`.`nomeUsuario` " +
    " , `bilhetecompeticaocartola`.`nrContatoUsuario` " +
    " , `bilhetecompeticaocartola`.`nrSequencialRodadaCartola` " +
    " , `bilhetecompeticaocartola`.`statusAtualBilhete` " +
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
    " FROM `bilhetecompeticaocartola` " +
    " LEFT OUTER JOIN `timeBilheteCompeticaoCartola` " +
    " ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilhetecompeticaocartola`.`idBilhete`  " +
    " WHERE `bilhetecompeticaocartola`.`nrContatoUsuario` " + `= "${nrContatoUsuario}" ` +
    " AND `bilhetecompeticaocartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
    " AND `bilhetecompeticaocartola`.`statusAtualBilhete` = 'Gerado' " +
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


const getTimesDaCompeticao = ( nrSequencialRodadaCartola) => {

  return sequelize.query("SELECT `bilhetecompeticaocartola`.`idBilhete` " +
     " , `bilhetecompeticaocartola`.`nomeUsuario` " +
     " , `bilhetecompeticaocartola`.`nrContatoUsuario` " +
     " , `bilhetecompeticaocartola`.`nrSequencialRodadaCartola` " +
     " , `bilhetecompeticaocartola`.`statusAtualBilhete` " +
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
     " FROM `bilhetecompeticaocartola` " +
     " LEFT OUTER JOIN `timeBilheteCompeticaoCartola` " +
     " ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilhetecompeticaocartola`.`idBilhete`  " +
     " WHERE `bilhetecompeticaocartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
     " AND `bilhetecompeticaocartola`.`statusAtualBilhete` = 'Pago' " +
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

  return sequelize.query( "SELECT COUNT(*) as `count` " +
            "FROM `bilhetecompeticaocartola` "  +
            "INNER JOIN `timeBilheteCompeticaoCartola`  " +
            "ON `bilhetecompeticaocartola`.`idBilhete` = `timeBilheteCompeticaoCartola`.`idBilhete` "  +
            " WHERE `bilhetecompeticaocartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` + 
            " AND `bilhetecompeticaocartola`.`statusAtualBilhete` = 'Pago' "  
     , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
       if (data === null) {
         data = 0;
         return false;
       } else {
         return data[0].count;
       }
     });

};





module.exports = {
  cadastrarTimeBilhete,
  getTimeBilheteGerado,
  delTimeBilhete,
  getTimesDaCompeticao,
  getTimeCompeticaoCount
};
