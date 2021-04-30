const CompeticaoCartola = require('../model/competicaoCartola');
const { Op } = require("sequelize");



const cadastrarCompeticaoCartola = dadosCompeticaoCartola => {

  return CompeticaoCartola.findOne({
    where:
    {
      idUsuarioAdmLiga: dadosCompeticaoCartola.idUsuarioAdmLiga,
      anoTemporada: dadosCompeticaoCartola.anoTemporada,
      nrRodada: dadosCompeticaoCartola.nrRodada,
      tipoCompeticao: dadosCompeticaoCartola.tipoCompeticao
    }
  }).then(psq1 => {
    if (psq1 === null) {

      return CompeticaoCartola.max('nrSequencialRodadaCartola'
      ).then(max => {
        if (Number.isNaN(max)) {
          max = 0;
          const numMax = max + 1;
          dadosCompeticaoCartola.nrSequencialRodadaCartola = numMax;
          const competicaoCartola = new CompeticaoCartola({ ...dadosCompeticaoCartola });
          competicaoCartola.save();
          return true;
        } else {
          const numMax = max + 1;
          dadosCompeticaoCartola.nrSequencialRodadaCartola = numMax;
          const competicaoCartola = new CompeticaoCartola({ ...dadosCompeticaoCartola });
          competicaoCartola.save();
          return true;
        }
      });

    } else {
      return false
    }
  });



};


const getCompeticaoCartolaAtivas = () => {
  return CompeticaoCartola.findAll({
    where:
    {
      statusCompeticao: {
        [Op.ne]: 'Encerrada'
      }
    }
  })
    .then(data => {
      if (data === null) {
        return false;
      } else {
        return data;
      }
    });
};


const delCompeticaoCartolaPorId = (nrSequencialRodadaCartola) => {
  return CompeticaoCartola.destroy({
    where:
    {
      nrSequencialRodadaCartola: nrSequencialRodadaCartola
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


const putCompeticaoCartola = dadosCompeticaoCartola => {

  const nrSequencialRodadaCartola = dadosCompeticaoCartola.nrSequencialRodadaCartola;
  const idUsuarioAdmLiga = dadosCompeticaoCartola.idUsuarioAdmLiga;
  const nomeLiga = dadosCompeticaoCartola.nomeLiga;
  const anoTemporada = dadosCompeticaoCartola.anoTemporada;
  const nrRodada = dadosCompeticaoCartola.nrRodada;
  const dataFimInscricao = dadosCompeticaoCartola.dataFimInscricao;
  const horaFimInscricao = dadosCompeticaoCartola.horaFimInscricao;
  const valorCompeticao = dadosCompeticaoCartola.valorCompeticao;
  const statusCompeticao = dadosCompeticaoCartola.statusCompeticao;
  const tipoCompeticao = dadosCompeticaoCartola.tipoCompeticao;

  return CompeticaoCartola.update(
    {
      idUsuarioAdmLiga: idUsuarioAdmLiga,
      nomeLiga: nomeLiga,
      anoTemporada: anoTemporada,
      nrRodada: nrRodada,
      dataFimInscricao: dataFimInscricao,
      horaFimInscricao: horaFimInscricao,
      valorCompeticao: valorCompeticao,
      statusCompeticao: statusCompeticao,
      tipoCompeticao: tipoCompeticao

    },
    {
      where: {
        nrSequencialRodadaCartola: nrSequencialRodadaCartola
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
  cadastrarCompeticaoCartola,
  getCompeticaoCartolaAtivas,
  delCompeticaoCartolaPorId,
  putCompeticaoCartola
};