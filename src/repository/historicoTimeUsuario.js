const HistoricoTimeUsuario = require('../model/historicoTimeUsuario');
const { Op } = require("sequelize");
const sequelize = require('../database/database');

const BASE_URL = 'https://api.cartolafc.globo.com';
const unirest = require("unirest");

const cadastrarHistoricoTimeUsuario = dadosHistoricoTimeUsuario => {

  // Salvar historico de times do usuario
  return HistoricoTimeUsuario.findOne({
    where:
    {
      nrContatoUsuario: dadosHistoricoTimeUsuario.nrContatoUsuario,
      time_id: dadosHistoricoTimeUsuario.time_id
    }
  }
  ).then(psq => {
    if (psq === null) {
      const historicoTimeUsuario = new HistoricoTimeUsuario({ ...dadosHistoricoTimeUsuario });
      historicoTimeUsuario.save();
    }
    return true;
  });

};

const getTimesUsuario = (nrContatoUsuario) => {

  return HistoricoTimeUsuario.findAll({
    where:
    {
      nrContatoUsuario: nrContatoUsuario
    }
  }).then(data => {
    if (data === null) {
      return false;
    } else {
      return data;
    }
  });
};

const delHistoricoTimeUsuario = (time_id) => {
  return HistoricoTimeUsuario.destroy({
    where:
    {
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


const getTimesUsuarioMobile = async (nrContatoUsuario) => {


  result = await sequelize.query("SELECT distinct `historicoTimeUsuario`.`time_id` " +
    " FROM `historicoTimeUsuario` " +
    " WHERE `historicoTimeUsuario`.`nrContatoUsuario` " + `= "${nrContatoUsuario}" ` +
    " ORDER BY `historicoTimeUsuario`.`time_id` "
    , {
      type: sequelize.QueryTypes.SELECT
    });

  if (result.length > 0) {

    for (let i = 0; i < result.length; i++) { 
     
      path = `/time/id/${result[i].time_id}`;
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
        result[i].assinante = resultJson.body.time.assinante;
        result[i].foto_perfil = resultJson.body.time.foto_perfil;
        result[i].nome = resultJson.body.time.nome;
        result[i].nome_cartola = resultJson.body.time.nome_cartola;
        result[i].slug = resultJson.body.time.slug;
        result[i].url_escudo_png = resultJson.body.time.url_escudo_png;
        result[i].url_escudo_svg = resultJson.body.time.url_escudo_svg;
        result[i].facebook_id = resultJson.body.time.facebook_id;
      }
    }

    return result;

  }else{
    return false;
  }
};


module.exports = {
  cadastrarHistoricoTimeUsuario,
  getTimesUsuario,
  delHistoricoTimeUsuario,
  getTimesUsuarioMobile
};
