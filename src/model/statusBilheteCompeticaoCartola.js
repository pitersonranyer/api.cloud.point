const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const StatusBilheteCompeticaoCartola = sequelize.define("statusBilheteCompeticaoCartola", {


  idBilhete: {  
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  dataHoraAtualizacaoBilhete: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.DATE
  },

  statusBilhete: { //Gerado, Pago, Cancelado
    allowNull: false,
    type: Sequelize.STRING(20)
  },

  respAtualizacaoBilhete: { //Admin ou Usuario
    allowNull: true,
    type: Sequelize.STRING(50)
  },  
  
},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = StatusBilheteCompeticaoCartola;
