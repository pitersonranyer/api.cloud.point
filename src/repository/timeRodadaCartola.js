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

    return sequelize.query("SELECT `timeusuariocartola`.`idUsuario` " +
        ",    `timeusuariocartola`.`time_id` " +
        ",    `timeusuariocartola`.`assinante` " +
        ",    `timeusuariocartola`.`foto_perfil` " +
        ",    `timeusuariocartola`.`nome` " +
        ",    `timeusuariocartola`.`nome_cartola` " +
        ",    `timeusuariocartola`.`slug` " +
        ",    `timeusuariocartola`.`url_escudo_png` " +
        ",    `timeusuariocartola`.`url_escudo_svg` " +
        ",    `timeusuariocartola`.`facebook_id` " +
        ",    `timerodadacartola`.`anoTemporada` " +
        ",    `timerodadacartola`.`idRodada` " +
        ",    `timerodadacartola`.`pontosTotais` " +
        ",    `timerodadacartola`.`statusPgto` " +
        " FROM `timeusuariocartola` " +
        " inner join `timerodadacartola` " +
        " on    `timeusuariocartola`.`idUsuario` = `timerodadacartola`.`idUsuario` " +
        " and   `timeusuariocartola`.`time_id` = `timerodadacartola`.`time_id` " +
        " where `timerodadacartola`.`anoTemporada` " + `= ${anoTemporada} ` + 
        " and   `timerodadacartola`.`idRodada` " + `= ${idRodada} ` +
        " and   `timerodadacartola`.`idUsuario` " + `= ${idUsuario} `
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

    return sequelize.query("SELECT `timeusuariocartola`.`idUsuario` " +
        ",    `timeusuariocartola`.`time_id` " +
        ",    `timeusuariocartola`.`assinante` " +
        ",    `timeusuariocartola`.`foto_perfil` " +
        ",    `timeusuariocartola`.`nome` " +
        ",    `timeusuariocartola`.`nome_cartola` " +
        ",    `timeusuariocartola`.`slug` " +
        ",    `timeusuariocartola`.`url_escudo_png` " +
        ",    `timeusuariocartola`.`url_escudo_svg` " +
        ",    `timeusuariocartola`.`facebook_id` " +
        ",    `timerodadacartola`.`anoTemporada` " +
        ",    `timerodadacartola`.`idRodada` " +
        ",    `timerodadacartola`.`pontosTotais` " +
        ",    `timerodadacartola`.`statusPgto` " +
        " FROM `timeusuariocartola` " +
        " inner join `timerodadacartola` " +
        " on    `timeusuariocartola`.`idUsuario` = `timerodadacartola`.`idUsuario` " +
        " and   `timeusuariocartola`.`time_id` = `timerodadacartola`.`time_id` " +
        " where  `timerodadacartola`.`idRodada` " + `= ${idRodada} ` +
        " and   `timerodadacartola`.`anoTemporada` " + `= ${anoTemporada} ` +
        " and   `timerodadacartola`.`statusPgto` = 'Pago' " +
        " order by  `timerodadacartola`.`pontosTotais` DESC "
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

    return sequelize.query("SELECT `timeusuariocartola`.`idUsuario` " +
        ",    `timeusuariocartola`.`time_id` " +
        ",    `timeusuariocartola`.`assinante` " +
        ",    `timeusuariocartola`.`foto_perfil` " +
        ",    `timeusuariocartola`.`nome` " +
        ",    `timeusuariocartola`.`nome_cartola` " +
        ",    `timeusuariocartola`.`slug` " +
        ",    `timeusuariocartola`.`url_escudo_png` " +
        ",    `timeusuariocartola`.`url_escudo_svg` " +
        ",    `timeusuariocartola`.`facebook_id` " +
        ",    `timerodadacartola`.`anoTemporada` " +
        ",    `timerodadacartola`.`idRodada` " +
        ",    `timerodadacartola`.`pontosTotais` " +
        ",    `timerodadacartola`.`statusPgto` " +
        " FROM `timeusuariocartola` " +
        " inner join `timerodadacartola` " +
        " on    `timeusuariocartola`.`idUsuario` = `timerodadacartola`.`idUsuario` " +
        " and   `timeusuariocartola`.`time_id` = `timerodadacartola`.`time_id` " +
        " where  `timerodadacartola`.`idRodada` " + `= ${idRodada} ` +
        " and   `timerodadacartola`.`anoTemporada` " + `= ${anoTemporada} ` +
        " and   `timerodadacartola`.`statusPgto` = 'Pendente' "
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
            console.log('erro ao atualizar parciais');
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
    return sequelize.query("SELECT `rodadacartola`.`anoTemporada` , `timerodadacartola`.`idRodada` , `timerodadacartola`.`statusPgto`,  sum(`rodadacartola`.`valorRodada`) AS `sum`" +
        "FROM `rodadacartola`" +
        "INNER JOIN timerodadacartola ON `timerodadacartola`.`idRodada` = `rodadacartola`.`idRodada` " +
        "WHERE `timerodadacartola`.`idUsuario` " + `= ${idUsuario} ` +
        "GROUP BY `rodadacartola`.`anoTemporada` , `timerodadacartola`.`idRodada` , `timerodadacartola`.`statusPgto`"
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
