const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Blacklist = sequelize.define("blacklist", {

  token: {
    allowNull: false,
    type: Sequelize.TEXT,
    is: /^[0-9a-f]{64}$/i
  }

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = Blacklist;
