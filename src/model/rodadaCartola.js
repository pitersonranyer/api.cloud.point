const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const RodadaCartola = sequelize.define("rodadaCartola", {
  anoTemporada: {  // 2020, 2021, 2022
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  idRodada: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  dtFimInscricao: {
    allowNull: true,
    type: Sequelize.STRING(10)
  },

  hrFimInscricao: {
    allowNull: true,       
    type: Sequelize.STRING(08)
  },

  status: {
    allowNull: true,
    type: Sequelize.STRING(10)
  },

  valorRodada: {
    allowNull: true,
    type: Sequelize.DECIMAL(15, 2)
  },
  
},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = RodadaCartola;
