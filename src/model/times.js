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

  Times.create({ id: 1  , nomeTime: 'Internacional-RS', nomeAbvd: 'INT', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/internacional.png' });
  Times.create({ id: 2  , nomeTime: 'Grêmio-RS', nomeAbvd: 'GRE', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/gremio.png' });
  Times.create({ id: 3  , nomeTime: 'Atletico-MG', nomeAbvd: 'CAM', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/atletico-mg.png' });
  Times.create({ id: 4  , nomeTime: 'Palmeiras', nomeAbvd: 'PAL', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/palmeiras.png' });
  Times.create({ id: 5  , nomeTime: 'São Paulo', nomeAbvd: 'SAO', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/sao-paulo.png' });
  Times.create({ id: 6  , nomeTime: 'Santos', nomeAbvd: 'SAN', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/santos.png' });
  Times.create({ id: 7  , nomeTime: 'Bahia', nomeAbvd: 'BAH', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/bahia.png' });
  Times.create({ id: 8  , nomeTime: 'Botafogo', nomeAbvd: 'BOT', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/botafogo.png' });
  Times.create({ id: 9  , nomeTime: 'Cruzeiro', nomeAbvd: 'CRU', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/cruzeiro.png' });
  Times.create({ id: 10 , nomeTime: 'Athletico-PR', nomeAbvd: 'CAP', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/athletico.png' });
  Times.create({ id: 11 , nomeTime: 'Flamengo', nomeAbvd: 'FLA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/flamengo.png' });
Times.create({ id: 12 , nomeTime: 'Chapecoense', nomeAbvd: 'CHA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/chapecoense.png' });
Times.create({ id: 13 , nomeTime: 'Corinthians', nomeAbvd: 'COR', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/corinthians.png' });
Times.create({ id: 14 , nomeTime: 'Ceara', nomeAbvd: 'CEA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/ceara.png' });
Times.create({ id: 15 , nomeTime: 'Fluminense', nomeAbvd: 'FLU', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/fluminense.png' });
Times.create({ id: 16 , nomeTime: 'Goiás', nomeAbvd: 'GOI', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/goias.png' });
Times.create({ id: 17 , nomeTime: 'Fortaleza', nomeAbvd: 'FOR', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/fortaleza.png' });
Times.create({ id: 18 , nomeTime: 'CSA', nomeAbvd: 'CSA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/csa.png' });
Times.create({ id: 19 , nomeTime: 'Avaí', nomeAbvd: 'AVA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/avai.png' });
Times.create({ id: 20 , nomeTime: 'Vasco', nomeAbvd: 'VAS', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/vasco.png' });
Times.create({ id: 21 , nomeTime: 'Botafogo-SP', nomeAbvd: 'BTS', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/botafogo-sp.png' });
Times.create({ id: 22 , nomeTime: 'Cuiabá', nomeAbvd: 'BTS', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/cuiaba-mt.png' });
Times.create({ id: 23 , nomeTime: 'Londrina', nomeAbvd: 'LON', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/londrina-pr.png' });
Times.create({ id: 24 , nomeTime: 'Atlético-GO', nomeAbvd: 'ACG', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/atletico-go.png' });
Times.create({ id: 25 , nomeTime: 'Coritiba', nomeAbvd: 'OES', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/coritiba.png' });
Times.create({ id: 26 , nomeTime: 'Oeste', nomeAbvd: 'OES', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/oeste.png' });
Times.create({ id: 27 , nomeTime: 'Paraná', nomeAbvd: 'PAR', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/parana.png' });
Times.create({ id: 28 , nomeTime: 'Bragantino', nomeAbvd: 'PAR', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/bragantino.png' });
Times.create({ id: 29 , nomeTime: 'Operário', nomeAbvd: 'OPE', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/operario.png' });
Times.create({ id: 30 , nomeTime: 'Vitória', nomeAbvd: 'VIT', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/vitoria.png' });
Times.create({ id: 31 , nomeTime: 'Figueirense', nomeAbvd: 'FIG', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/figueirense.png' });
Times.create({ id: 32 , nomeTime: 'Sport-PE', nomeAbvd: 'SPO', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/sport.png' });
Times.create({ id: 33 , nomeTime: 'Vila Nova', nomeAbvd: 'VIL', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/vila-nova-go.png' });
Times.create({ id: 34 , nomeTime: 'Criciúma', nomeAbvd: 'CRI', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/criciuma.png' });
Times.create({ id: 35 , nomeTime: 'São Bento', nomeAbvd: 'SAB', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/sao-bento.png' });
Times.create({ id: 36 , nomeTime: 'Ponte Preta', nomeAbvd: 'PON', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/ponte-preta.png' });
Times.create({ id: 37 , nomeTime: 'Guarani', nomeAbvd: 'GUA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/guarani.png' });
Times.create({ id: 38 , nomeTime: 'CRB', nomeAbvd: 'CRB', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/crb.png' });
Times.create({ id: 39 , nomeTime: 'Brasil de pelotas', nomeAbvd: 'BRA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/brasil-de-pelotas.png' });
Times.create({ id: 40 , nomeTime: 'América-MG', nomeAbvd: 'AME', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/america-mg.png' });
Times.create({ id: 41 , nomeTime: 'Ferroviário', nomeAbvd: 'FER', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/ferroviario-ce.png' });
Times.create({ id: 42 , nomeTime: 'Sampaio Corrêa', nomeAbvd: 'SAM', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/sampaio-correa.png' });
Times.create({ id: 43 , nomeTime: 'ABC', nomeAbvd: 'ABC', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/abc.png' });
Times.create({ id: 44 , nomeTime: 'Náutico', nomeAbvd: 'NAU', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/nautico.png' });
Times.create({ id: 45 , nomeTime: 'Imperatriz', nomeAbvd: 'IMP', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/imperatriz.png' });
Times.create({ id: 46 , nomeTime: 'Globo', nomeAbvd: 'GLO', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/globo.png' });
Times.create({ id: 47 , nomeTime: 'Botafogo-PB', nomeAbvd: 'BOT', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/botafogo-pb.png' });
Times.create({ id: 48 , nomeTime: 'Treze', nomeAbvd: 'TRE', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/treze-pb.png' });
Times.create({ id: 49 , nomeTime: 'Santa Cruz', nomeAbvd: 'STA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/santa-cruz.png' });
Times.create({ id: 50 , nomeTime: 'Confiança', nomeAbvd: 'CON', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/confianca.png' });
Times.create({ id: 51 , nomeTime: 'Volta Redonda', nomeAbvd: 'VOL', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/volta-redonda.png' });
Times.create({ id: 52 , nomeTime: 'São José', nomeAbvd: 'SAO', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/sao-jose.png' });
Times.create({ id: 53 , nomeTime: 'Remo', nomeAbvd: 'REM', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/remo.png' });
Times.create({ id: 54 , nomeTime: 'Paysandu', nomeAbvd: 'PAY', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/paysandu.png' });
Times.create({ id: 55 , nomeTime: 'Juventude', nomeAbvd: 'JUV', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/juventude.png' });
Times.create({ id: 56 , nomeTime: 'Tombense', nomeAbvd: 'TOM', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/tombense.png' });
Times.create({ id: 57 , nomeTime: 'Ypiranga', nomeAbvd: 'YPI', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/ypiranga.png' });
Times.create({ id: 58 , nomeTime: 'BOA', nomeAbvd: 'BOA', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/boa.png' });
Times.create({ id: 59 , nomeTime: 'Luverdense', nomeAbvd: 'LUV', UrlEscudo: 'https://e.imguol.com/futebol/brasoes/40x40/luverdense.png' });
Times.create({ id: 60 , nomeTime: 'Atletico-AC', nomeAbvd: 'CAA', UrlEscudo: 'https://ssl.gstatic.com/onebox/media/sports/logos/zqaQcJv59s55dqVf1m7VoA_48x48.png' });





module.exports = Times;
