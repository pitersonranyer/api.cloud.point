const TimeRodadaCartola = require('../model/timeRodadaCartola');
const sequelize = require('../database/database');


// Cadastrar time do usuario na rodada.
// -- Observação:
// Antes de cadastrar incluir o saldoUsuario
// --> cadastrarSaldoUsuario (saldoUsuario)     
const cadastrarTimeRodadaCartola = dadostimeRodadaCartola => {
    dadostimeRodadaCartola.statusPgto = 'Pendente';
    return TimeRodadaCartola.findOne({
        where:
        {
            anoTemporada: dadostimeRodadaCartola.anoTemporada,
            idRodada: dadostimeRodadaCartola.idRodada,
            idUsuario: dadostimeRodadaCartola.idUsuario,
            time_id: dadostimeRodadaCartola.time_id

        }
    })
        .then(psq1 => {
            if (psq1 === null) {

                const timeRodadaCartola = new TimeRodadaCartola({ ...dadostimeRodadaCartola });
                timeRodadaCartola.save();
                return true;

            } else {
                return false
            }
        });
};

const getTimeRodadaCartolaOne = (anoTemporada, idRodada, idUsuario, time_id) => {

    return TimeRodadaCartola.findOne({
        where:
        {
            anoTemporada: anoTemporada,
            idRodada: idRodada,
            idUsuario: idUsuario,
            time_id: time_id
        }
    }).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};

// const getTimeRodadaCartolaPorId = (anoTemporada, idRodada, idUsuario) => {
//
//    return TimeRodadaCartola.findAll({
//        where:
//        {
//            anoTemporada: anoTemporada,
//            idRodada: idRodada,
//            idUsuario: idUsuario
//        }
//    }).then(data => {
//        if (data === null) {
//            return false;
//        } else {
//            return data;
//        }
//    });
// };


// listar time por rodada e usuario
const getTimeRodadaCartolaPorId = (anoTemporada, idRodada, idUsuario) => {

    return sequelize.query("SELECT `timeUsuarioCartola`.`idUsuario` " +
        ",    `timeUsuarioCartola`.`time_id` " +
        ",    `timeUsuarioCartola`.`assinante` " +
        ",    `timeUsuarioCartola`.`foto_perfil` " +
        ",    `timeUsuarioCartola`.`nome` " +
        ",    `timeUsuarioCartola`.`nome_cartola` " +
        ",    `timeUsuarioCartola`.`slug` " +
        ",    `timeUsuarioCartola`.`url_escudo_png` " +
        ",    `timeUsuarioCartola`.`url_escudo_svg` " +
        ",    `timeUsuarioCartola`.`facebook_id` " +
        ",    `timeRodadaCartola`.`anoTemporada` " +
        ",    `timeRodadaCartola`.`idRodada` " +
        ",    `timeRodadaCartola`.`pontosTotais` " +
        ",    `timeRodadaCartola`.`statusPgto` " +
        " FROM `timeUsuarioCartola` " +
        " inner join `timeRodadaCartola` " +
        " on    `timeUsuarioCartola`.`idUsuario` = `timeRodadaCartola`.`idUsuario` " +
        " and   `timeUsuarioCartola`.`time_id` = `timeRodadaCartola`.`time_id` " +
        " where `timeRodadaCartola`.`anoTemporada` " + `= ${anoTemporada} ` +
        " and   `timeRodadaCartola`.`idRodada` " + `= ${idRodada} ` +
        " and   `timeRodadaCartola`.`idUsuario` " + `= ${idUsuario} `
        , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
            if (data === null) {
                data = 0;
                return false;
            } else {
                return data;
            }
        });
};

// Classificação geral da rodada
// const getTimeRodadaCartolaPorRodada = (anoTemporada, idRodada) => {
//
//    return TimeRodadaCartola.findAll({
//        where:
//        {
//            anoTemporada: anoTemporada,
//            idRodada: idRodada,
//            statusPgto: 'Pago'
//        }
//        , order: [
//            ['pontosTotais', 'DESC']
//        ]
//    }).then(data => {
//        if (data === null) {
//            return false;
//        } else {
//            return data;
//        }
//    });
// };


// Classificação geral da rodada
const getTimeRodadaCartolaPorRodada = (anoTemporada, idRodada) => {

    return sequelize.query("SELECT `timeUsuarioCartola`.`idUsuario` " +
        ",    `timeUsuarioCartola`.`time_id` " +
        ",    `timeUsuarioCartola`.`assinante` " +
        ",    `timeUsuarioCartola`.`foto_perfil` " +
        ",    `timeUsuarioCartola`.`nome` " +
        ",    `timeUsuarioCartola`.`nome_cartola` " +
        ",    `timeUsuarioCartola`.`slug` " +
        ",    `timeUsuarioCartola`.`url_escudo_png` " +
        ",    `timeUsuarioCartola`.`url_escudo_svg` " +
        ",    `timeUsuarioCartola`.`facebook_id` " +
        ",    `timeRodadaCartola`.`anoTemporada` " +
        ",    `timeRodadaCartola`.`idRodada` " +
        ",    `timeRodadaCartola`.`pontosTotais` " +
        ",    `timeRodadaCartola`.`statusPgto` " +
        " FROM `timeUsuarioCartola` " +
        " inner join `timeRodadaCartola` " +
        " on    `timeUsuarioCartola`.`idUsuario` = `timeRodadaCartola`.`idUsuario` " +
        " and   `timeUsuarioCartola`.`time_id` = `timeRodadaCartola`.`time_id` " +
        " where  `timeRodadaCartola`.`idRodada` " + `= ${idRodada} ` +
        " and   `timeRodadaCartola`.`anoTemporada` " + `= ${anoTemporada} ` +
        " and   `timeRodadaCartola`.`statusPgto` = 'Pago' " +
        " order by  `timeRodadaCartola`.`pontosTotais` DESC "
        , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
            if (data === null) {
                data = 0;
                return false;
            } else {
                return data;
            }
        });
};

// Lista de Time Pendente de Pagamento
const getTimeRodadaPendentePgto = (anoTemporada, idRodada) => {

    return sequelize.query("SELECT `timeUsuarioCartola`.`idUsuario` " +
        ",    `timeUsuarioCartola`.`time_id` " +
        ",    `timeUsuarioCartola`.`assinante` " +
        ",    `timeUsuarioCartola`.`foto_perfil` " +
        ",    `timeUsuarioCartola`.`nome` " +
        ",    `timeUsuarioCartola`.`nome_cartola` " +
        ",    `timeUsuarioCartola`.`slug` " +
        ",    `timeUsuarioCartola`.`url_escudo_png` " +
        ",    `timeUsuarioCartola`.`url_escudo_svg` " +
        ",    `timeUsuarioCartola`.`facebook_id` " +
        ",    `timeRodadaCartola`.`anoTemporada` " +
        ",    `timeRodadaCartola`.`idRodada` " +
        ",    `timeRodadaCartola`.`pontosTotais` " +
        ",    `timeRodadaCartola`.`statusPgto` " +
        " FROM `timeUsuarioCartola` " +
        " inner join `timeRodadaCartola` " +
        " on    `timeUsuarioCartola`.`idUsuario` = `timeRodadaCartola`.`idUsuario` " +
        " and   `timeUsuarioCartola`.`time_id` = `timeRodadaCartola`.`time_id` " +
        " where  `timeRodadaCartola`.`idRodada` " + `= ${idRodada} ` +
        " and   `timeRodadaCartola`.`anoTemporada` " + `= ${anoTemporada} ` +
        " and   `timeRodadaCartola`.`statusPgto` = 'Pendente' "
        , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
            if (data === null) {
                data = 0;
                return false;
            } else {
                return data;
            }
        });
};




// total de inscrintos na rodada
const getTimeRodadaCartolaCount = (anoTemporada, idRodada) => {


    return TimeRodadaCartola.count({
        where:
        {
            anoTemporada: anoTemporada,
            idRodada: idRodada,
            statusPgto: 'Pago'
        }
    }).then(data => {
        if (data === null) {
            data = 0;
            return data;
        } else {

            return data;
        }
    });

};

// Atualizar Pontos parciais da rodada
const putPontosRodadaCartola = dadostimeRodadaCartola => {
    const anoTemporada = dadostimeRodadaCartola.anoTemporada;
    const idRodada = dadostimeRodadaCartola.idRodada;
    const idUsuario = dadostimeRodadaCartola.idUsuario;
    const time_id = dadostimeRodadaCartola.time_id;

    const pontosTotais = dadostimeRodadaCartola.pontosTotais

    pontosTotais.toFixed(2);

    return TimeRodadaCartola.update(

        { pontosTotais: pontosTotais },
        {
            where: {
                anoTemporada: anoTemporada,
                idRodada: idRodada,
                idUsuario: idUsuario,
                time_id: time_id
            }
        }

    ).then(function (updatedRecord) {
        if (updatedRecord) {
            return true;
        }
        else {
            return false;
        }
    });
};

// atualizar status para pago
// -- Observação:
// Antes de atualizar o stutas atualizar o saldoUsuario
// --> liberarSaldoUsuario (saldoUsuario)     
const putStatusPgtoTimeCartola = dadostimeRodadaCartola => {
    const anoTemporada = dadostimeRodadaCartola.anoTemporada;
    const idRodada = dadostimeRodadaCartola.idRodada;
    const idUsuario = dadostimeRodadaCartola.idUsuario;
    const time_id = dadostimeRodadaCartola.time_id;

    return TimeRodadaCartola.update(
        { statusPgto: 'Pago' },
        {
            where: {
                anoTemporada: anoTemporada,
                idRodada: idRodada,
                idUsuario: idUsuario,
                time_id: time_id
            }
        }
    ).then(function (updatedRecord) {
        if (updatedRecord) {
            return true;
        }
        else {
            return false;
        }
    });
};

const getMeusJogosMeusPgtos = (idUsuario) => {
    return sequelize.query("SELECT `rodadaCartola`.`anoTemporada` , `timeRodadaCartola`.`idRodada` , `timeRodadaCartola`.`statusPgto`,  sum(`rodadaCartola`.`valorRodada`) AS `sum`" +
        "FROM `rodadaCartola`" +
        "INNER JOIN timeRodadaCartola ON `timeRodadaCartola`.`idRodada` = `rodadaCartola`.`idRodada` " +
        "WHERE `timeRodadaCartola`.`idUsuario` " + `= ${idUsuario} ` +
        "GROUP BY `rodadaCartola`.`anoTemporada` , `timeRodadaCartola`.`idRodada` , `timeRodadaCartola`.`statusPgto`"
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
    cadastrarTimeRodadaCartola,
    getTimeRodadaCartolaOne,
    getTimeRodadaCartolaPorId,
    getTimeRodadaCartolaPorRodada,
    getTimeRodadaCartolaCount,
    putPontosRodadaCartola,
    putStatusPgtoTimeCartola,
    getMeusJogosMeusPgtos,
    getTimeRodadaPendentePgto
};
