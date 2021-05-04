const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const CompeticaoCartola = sequelize.define("competicaoCartola", {

  nrSequencialRodadaCartola: {  
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  idUsuarioAdmLiga: {
    allowNull: true,
    type: Sequelize.INTEGER
  },

  nomeLiga: {
    allowNull: true,
    type: Sequelize.STRING(30)
  },

  anoTemporada: {  // 2020, 2021, 2022
    allowNull: false,
    type: Sequelize.INTEGER
  },

  nrRodada: {
    allowNull: false,
    type: Sequelize.INTEGER
  },

  dataFimInscricao: {
    allowNull: false,
    type: Sequelize.STRING(10)
  },

  horaFimInscricao: {
    allowNull: false,       
    type: Sequelize.STRING(08)
  },

  valorCompeticao: {
    allowNull: false,
    type: Sequelize.DECIMAL(15,2)
  },

  txAdm: {
    allowNull: false,
    type: Sequelize.SMALLINT
  },

  statusCompeticao: {
    allowNull: false,
    type: Sequelize.STRING(10)
  },

  tipoCompeticao: {
    allowNull: false,
    type: Sequelize.STRING(15) 
  },

  linkGrupoWapp: {
    allowNull: false,
    type: Sequelize.STRING(100) 
  },

  prioridadeConsulta: {
    allowNull: false,
    type: Sequelize.SMALLINT
  },
  
},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = CompeticaoCartola;
