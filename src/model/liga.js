const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Liga = sequelize.define("liga", {

  idLiga: {  
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  anoTemporada: { 
    allowNull: false,
    type: Sequelize.INTEGER
  },

  idRodada: {
    allowNull: false,
    type: Sequelize.INTEGER
  },

  idUsuarioAdmLiga: {
    allowNull: false,
    type: Sequelize.INTEGER
  },

  nomeLiga: {
    allowNull: true,
    type: Sequelize.STRING(100)
  },

  valorLiga: {
    allowNull: true,
    type: Sequelize.DECIMAL(15, 2)
  },

  // Rodada, Mensal, Anual
  tipoLiga: {
    allowNull: true,
    type: Sequelize.STRING(30)
  },

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = Liga;
