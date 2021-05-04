const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const HistoricoTimeUsuario = sequelize.define("historicoTimeUsuario", {


  nrSeqTime: {  
    allowNull: false,
    primaryKey: true,
    autoIncrement: true, 
   type: Sequelize.INTEGER
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
  }
},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = HistoricoTimeUsuario;
