const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const TimeUsuarioCartola = sequelize.define("timeUsuarioCartola", {
 
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

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = TimeUsuarioCartola;
