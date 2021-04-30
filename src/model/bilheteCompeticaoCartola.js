const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const BilheteCompeticaoCartola = sequelize.define("bilheteCompeticaoCartola", {


  idBilhete: {  
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  nomeUsuario: {
    allowNull: false,
    type: Sequelize.STRING(30)
  },

  nrContatoUsuario: {
    allowNull: false,
    type: Sequelize.STRING(15)
  },

  statusAtualBilhete: { //Gerado, Pago, Cancelado
    allowNull: false,
    type: Sequelize.STRING(20)
  },

  nrSequencialRodadaCartola: {  
    allowNull: false,
    type: Sequelize.INTEGER
  },
  
},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = BilheteCompeticaoCartola;
