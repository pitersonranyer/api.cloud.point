const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const Atletas = sequelize.define("atletas", {

  nrRodada: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.SMALLINT
  },

  atleta_id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.BIGINT
  },

  apelido: {
    allowNull: true,
    type: Sequelize.STRING(40)
  },
  foto: {
    allowNull: true,
    type: Sequelize.STRING(255)
  },
  pontuacao: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 2)
  },
  posicao_id: {
    allowNull: true,
    type: Sequelize.SMALLINT
  },
  clube_id: {
    allowNull: true,
    type: Sequelize.SMALLINT
  },
  entrou_em_campo: {
    allowNull: true,
    type: Sequelize.BOOLEAN
  },
  scoutPositivo: {
    allowNull: true,
    type: Sequelize.STRING(255)
  },
  scoutNegativo: {
    allowNull: true,
    type: Sequelize.STRING(255)
  },

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = Atletas;
