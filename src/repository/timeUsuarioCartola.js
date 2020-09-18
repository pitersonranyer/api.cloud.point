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
    " left outer join `timeRodadaCartola` " +
    " on    `timeUsuarioCartola`.`idUsuario` = `timeRodadaCartola`.`idUsuario` " +
    " and   `timeUsuarioCartola`.`time_id` = `timeRodadaCartola`.`time_id` " +
    " and   `timeRodadaCartola`.`idRodada` "  + `= ${idRodada} `  +
    " and   `timeRodadaCartola`.`anoTemporada` "  + `= ${anoTemporada} `  +
    " where `timeUsuarioCartola`.`idUsuario` "  + `= ${idUsuario} `
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
