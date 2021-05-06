const CompeticaoCartola = require('../model/competicaoCartola');
const sequelize = require('../database/database');
const { Op } = require("sequelize");



const cadastrarCompeticaoCartola = dadosCompeticaoCartola => {

  if (dadosCompeticaoCartola.nomeLiga === 'POINT DO JOGADOR') {
    dadosCompeticaoCartola.prioridadeConsulta = 0;
  } else {
    dadosCompeticaoCartola.prioridadeConsulta = 1;
  }

  return CompeticaoCartola.findOne({
    where:
    {
      idUsuarioAdmLiga: dadosCompeticaoCartola.idUsuarioAdmLiga,
      anoTemporada: dadosCompeticaoCartola.anoTemporada,
      valorCompeticao: dadosCompeticaoCartola.valorCompeticao,
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

const getCompeticaoCartolaAtivasId = (idUsuarioAdmLiga) => {
  return sequelize.query("SELECT `competicaoCartola`.`nrSequencialRodadaCartola` " +
    " ,  `competicaoCartola`.`idUsuarioAdmLiga` " +
    " ,  `competicaoCartola`.`nomeLiga` " +
    " ,  `competicaoCartola`.`anoTemporada` " +
    " ,  `competicaoCartola`.`nrRodada` " +
    " ,  `competicaoCartola`.`dataFimInscricao` " +
    " ,  `competicaoCartola`.`horaFimInscricao` " +
    " ,  `competicaoCartola`.`valorCompeticao` " +
    " ,  `competicaoCartola`.`txAdm` " +
    " ,  `competicaoCartola`.`statusCompeticao` " +
    " ,  `competicaoCartola`.`tipoCompeticao` " +
    " ,  `competicaoCartola`.`linkGrupoWapp` " +
    " ,  `competicaoCartola`.`prioridadeConsulta` " +
    " FROM  `competicaoCartola` " +
    " WHERE `competicaoCartola`.`idUsuarioAdmLiga` " + `= "${idUsuarioAdmLiga}" ` +
    " AND `competicaoCartola`.`statusCompeticao` <> 'Encerrada' " +
    " order by  `competicaoCartola`.`prioridadeConsulta` ASC "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
        return false;
      } else {
        return data;
      }
    });
};


const getCompeticaoCartolaAtivas = () => {
  return sequelize.query("SELECT `competicaoCartola`.`nrSequencialRodadaCartola` " +
    " ,  `competicaoCartola`.`idUsuarioAdmLiga` " +
    " ,  `competicaoCartola`.`nomeLiga` " +
    " ,  `competicaoCartola`.`anoTemporada` " +
    " ,  `competicaoCartola`.`nrRodada` " +
    " ,  `competicaoCartola`.`dataFimInscricao` " +
    " ,  `competicaoCartola`.`horaFimInscricao` " +
    " ,  `competicaoCartola`.`valorCompeticao` " +
    " ,  `competicaoCartola`.`txAdm` " +
    " ,  `competicaoCartola`.`statusCompeticao` " +
    " ,  `competicaoCartola`.`tipoCompeticao` " +
    " ,  `competicaoCartola`.`linkGrupoWapp` " +
    " ,  `competicaoCartola`.`prioridadeConsulta` " +
    " FROM  `competicaoCartola` " +
    " WHERE `competicaoCartola`.`statusCompeticao` <> 'Encerrada' " +
    " order by  `competicaoCartola`.`prioridadeConsulta` ASC "
    , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
      if (data === null) {
        data = 0;
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
  const txAdm = dadosCompeticaoCartola.txAdm;
  const linkGrupoWapp = dadosCompeticaoCartola.linkGrupoWapp;
  const prioridadeConsulta = dadosCompeticaoCartola.prioridadeConsulta;


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
      tipoCompeticao: tipoCompeticao,
      txAdm: txAdm,
      linkGrupoWapp: linkGrupoWapp,
      prioridadeConsulta: prioridadeConsulta


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
  putCompeticaoCartola,
  getCompeticaoCartolaAtivasId
};
