const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const PontuacaoTimeRodada = sequelize.define("pontuacaoTimeRodada", {


  time_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.BIGINT
  },

  nrRodada: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.BIGINT
  },

 pontuacao: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 2)
  },

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = PontuacaoTimeRodada;
