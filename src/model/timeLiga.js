const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const TimeLiga = sequelize.define("timeLiga", {

  idLiga: {  
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  time_id: {
    primaryKey: true,
    allowNull: false,
    type: Sequelize.INTEGER
  },

  assinante: {
    allowNull: false,
    defaultValue: false,
    type: Sequelize.BOOLEAN
  },

  foto_perfil: {
    allowNull: true,
    type: Sequelize.STRING(200)
  },

  nome: {
    allowNull: true,
    type: Sequelize.STRING(200)
  },

  nome_cartola: {
    allowNull: true,
    type: Sequelize.STRING(200)
  },

  slug: {
    allowNull: true,
    type: Sequelize.STRING(200)
  },

  url_escudo_png: {
    allowNull: true,
    type: Sequelize.STRING(200)
  },


  url_escudo_svg: {
    allowNull: true,
    type: Sequelize.STRING(200)
  },

  facebook_id: {
    allowNull: true,
    type: Sequelize.BIGINT
  },

  statusPgto: {
    allowNull: true,
    type: Sequelize.STRING(20)
  },

  pontosTotais: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 2)
  },

  qtJogadoresPontuados: {
    allowNull: true,
    type: Sequelize.SMALLINT
  }

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = TimeLiga;
