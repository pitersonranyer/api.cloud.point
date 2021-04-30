const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const HistoricoTimeUsuario = sequelize.define("historicoTimeUsuario", {


  nrSeqTime: {  
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, 
   type: Sequelize.SMALLINT
  },

  nrContatoUsuario: {  
    allowNull: false,
    type: Sequelize.STRING(15)
  },

  nomeUsuario: {
    allowNull: false,
    type: Sequelize.STRING(30)
  },

  time_id: {
    allowNull: false,
    type: Sequelize.BIGINT
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

module.exports = HistoricoTimeUsuario;
