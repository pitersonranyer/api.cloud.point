const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const TimeRodadaCartola = sequelize.define("timeRodadaCartola", {
  anoTemporada: {  // 2020, 2021, 2022
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  //Sequelize não deixou criar FK da tabela  RodadaCartola
  idRodada: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  idUsuario: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  time_id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  statusPgto: {
    allowNull: true,
    type: Sequelize.STRING(20)
  },

  pontosTotais: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 2)
  }

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = TimeRodadaCartola;
