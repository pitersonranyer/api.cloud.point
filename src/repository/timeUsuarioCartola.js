const TimeUsuarioCartola = require('../model/timeUsuarioCartola');
const sequelize = require('../database/database');

const cadastrarTimeUsuarioCartola = dadosTimeUsuarioCartola => {
    return TimeUsuarioCartola.findOne({ where: { time_id: dadosTimeUsuarioCartola.time_id } }).then(psq1 => {
        if (psq1 === null) {

            const timeUsuarioCartola = new TimeUsuarioCartola({ ...dadosTimeUsuarioCartola });
            timeUsuarioCartola.save();
            return true;

        } else {
            return false
        }
    });
};

const getTodosTimesCartola = () => {
    return TimeUsuarioCartola.findAll().then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};

const getTimesUsuarioCartola = (id) => {
    return TimeUsuarioCartola.findAll({ where: { idUsuario: id } }).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};


const delTimeUsuarioCartola = (idu, idt) => {
    return TimeUsuarioCartola.destroy({ where: { idUsuario: idu, time_id: idt } }).then(function (deletedRecord) {
        if (deletedRecord === 1) {
            return true;
        }
        else {
            return false;
        }
    }).catch(function (error) {
        return false;
    });

};

const getTimesUsuarioCartolaRodada = (anoTemporada, idUsuario, idRodada) => {
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
    " left outer join `timerodadacartola` " +
    " on    `timeusuariocartola`.`idUsuario` = `timerodadacartola`.`idUsuario` " +
    " and   `timeusuariocartola`.`time_id` = `timerodadacartola`.`time_id` " +
    " and   `timerodadacartola`.`idRodada` "  + `= ${idRodada} `  +
    " and   `timerodadacartola`.`anoTemporada` "  + `= ${anoTemporada} `  +
    " where `timeusuariocartola`.`idUsuario` "  + `= ${idUsuario} `
        , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
            if (data === null) {
                data = 0;
                return false;
            } else {
                return data;
            }
        });

};

module.exports = { cadastrarTimeUsuarioCartola, 
    getTodosTimesCartola, 
    getTimesUsuarioCartola, 
    getTimesUsuarioCartolaRodada,
    delTimeUsuarioCartola };
