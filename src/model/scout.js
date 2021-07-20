const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Scout = sequelize.define("scout", {

  nrRodada: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.SMALLINT
  },

  atleta_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.BIGINT
  },

  apelido: { 
    allowNull: true,
    type: Sequelize.STRING(40)
  },

  sigla_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.STRING(2)
  },

  qtde: {
    allowNull: true,
    type: Sequelize.SMALLINT
  },

  tipo: { // P = Positivo  N = Negativo
    allowNull: true,
    type: Sequelize.STRING(1)
  }

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = Scout;
