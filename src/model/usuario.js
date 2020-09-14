const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Usuario = sequelize.define("usuario", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nome: {
    allowNull: false,
    type: Sequelize.STRING(100),
    validate: {
      len: [2, 100]
    }
  },
  email: {
    allowNull: false,
    type: Sequelize.STRING(100),
    validate: {
      len: [2, 100]
    }
  },
  contato: {
    allowNull: true,
    type: Sequelize.STRING(15)
  },
  timeFavorito: {
    allowNull: true,
    type: Sequelize.STRING(100)
  },
  saldo: {
    allowNull: true,
    type: Sequelize.DECIMAL(15, 2)
  },
  admin: {
    allowNull: true,
    defaultValue: false,
    type: Sequelize.BOOLEAN
  },
  hash: {
    allowNull: false,
    type: Sequelize.TEXT,
    is: /^[0-9a-f]{64}$/i
  },
  salt: {
    allowNull: false,
    type: Sequelize.STRING(255),
    validate: {
      len: [2, 255]
    }
  }

},

  {
    freezeTableName: true,
    timestamps: false

  });



module.exports = Usuario;
