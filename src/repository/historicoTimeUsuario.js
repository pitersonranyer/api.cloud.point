const HistoricoTimeUsuario = require('../model/historicoTimeUsuario');
const { Op } = require("sequelize");

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

module.exports = {
  cadastrarHistoricoTimeUsuario,
  getTimesUsuario,
  delHistoricoTimeUsuario
};
