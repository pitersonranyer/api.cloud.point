const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Times = sequelize.define("times", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },

  
  nomeTime: {
    allowNull: true,
    type: Sequelize.STRING(100)
  },

  nomeAbvd: {
    allowNull: true,
    type: Sequelize.STRING(30)
  },

  UrlEscudo: {
    allowNull: true,
    type: Sequelize.STRING(200)
  }

  
},

  {
    freezeTableName: true,
    timestamps: false

  });




module.exports = Times;
