const Sequelize = require("sequelize");
const sequelize = require("../database/database");

const TimeRodadaCartola = sequelize.define("timeRodadaCartola", {
  anoTemporada: {  // 2020, 2021, 2022
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {         // Fk RodadaCartola 1:n
      model: 'RodadaCartola',
      key: 'anoTemporada'
    }
  },

  //Sequelize não deixou criar FK da tabela  RodadaCartola
  idRodada: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true
  },

  idUsuario: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {         // Fk usuario 1:n
      model: 'Usuario',
      key: 'id'
    }
  },

  time_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    primaryKey: true,
    references: {         // Fk TimeUsuarioCartola 1:n
      model: 'TimeUsuarioCartola',
      key: 'time_id'
    }
  },

  statusPgto: {
    allowNull: true,
    type: Sequelize.STRING(20)
  },

  pontosTotais: {
    allowNull: true,
    type: Sequelize.DECIMAL(10, 2)
  }

},

  {
    freezeTableName: true,
    timestamps: false

  });

module.exports = TimeRodadaCartola;
