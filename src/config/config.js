const Sequelize = require("sequelize");

const connection = new Sequelize('pointdojogador', 'pointdojogador', 'xedsi5-soWpet-cextek',
  {
    host: 'mysql669.umbler.com',
    dialect: 'mysql'
  }
);

module.exports = connection;