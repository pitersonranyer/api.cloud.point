const TimeLiga = require('../model/timeLiga');
const sequelize = require('../database/database');


const cadastrarTimeLiga = dadostimeLiga => {
    dadostimeLiga.statusPgto = 'Pago';
    return TimeLiga.findOne({
        where:
        {
            idLiga: dadostimeLiga.idLiga,
            time_id: dadostimeLiga.time_id

        }
    })
        .then(psq1 => {
            if (psq1 === null) {

                const timeLiga = new TimeLiga({ ...dadostimeLiga });
                timeLiga.save();
                return true;

            } else {
                return false
            }
        });
};


// Classificação geral da rodada
const getTimeLigaPorRodada = (anoTemporada, idRodada, idUsuarioAdmLiga, idLiga) => {
    console.log(anoTemporada, idRodada, idUsuarioAdmLiga, idLiga);

    return sequelize.query("SELECT `timeLiga`.`idLiga` " +
        ",    `timeLiga`.`time_id` " +
		",    `timeLiga`.`assinante` " +
		",    `timeLiga`.`foto_perfil` " +
		",    `timeLiga`.`nome` " +
		",    `timeLiga`.`nome_cartola` " +
		",    `timeLiga`.`slug` " +
		",    `timeLiga`.`url_escudo_png` " +
		",    `timeLiga`.`url_escudo_svg` " +
		",    `timeLiga`.`facebook_id` " +
		",    `timeLiga`.`statusPgto` " +
        ",    `timeLiga`.`pontosTotais` " +
		",    `timeLiga`.`qtJogadoresPontuados` " +
        ",    `liga`.`anoTemporada` " +
        ",    `liga`.`idRodada` " +
		",    `liga`.`idUsuarioAdmLiga` " +
		",    `liga`.`nomeLiga` " +
		",    `liga`.`valorLiga` " +
		",    `liga`.`tipoLiga` " +
        " FROM `timeLiga` " +
        " inner join `liga` " +
        " on    `timeLiga`.`idLiga` = `liga`.`idLiga` " +
        " where  `liga`.`idLiga` " + `= ${idLiga} ` +
		" and   `liga`.`anoTemporada` " + `= ${anoTemporada} ` +
        " and   `liga`.`idRodada` " + `= ${idRodada} ` +
		" and   `liga`.`idUsuarioAdmLiga` " + `= ${idUsuarioAdmLiga} ` +
        " and   `timeLiga`.`statusPgto` = 'Pago' " +
        " order by  `timeLiga`.`pontosTotais` DESC " +
        " ,         `timeLiga`.`nome` "
        , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
            if (data === null) {
                data = 0;
                return false;
            } else {
                return data;
            }
        });
};


module.exports = {
    cadastrarTimeLiga,
    getTimeLigaPorRodada
};
