const Liga = require('../model/liga');
const sequelize = require('../database/database');


const cadastrarliga = dadosLiga => {
    return Liga.max('idLiga',
        {
            where:
            {
                anoTemporada: dadosLiga.anoTemporada,
                idRodada: dadosLiga.idRodada
            }
        }).then(max => {
            if (Number.isNaN(max)) {
                max = 0;
                const numMax = max + 1;
                dadosLiga.idLiga = numMax;
                const liga = new Liga({ ...dadosLiga });
                liga.save();
                return true;
            } else {
                const numMax = max + 1;
                dadosLiga.idLiga = numMax;
                const liga = new Liga({ ...dadosLiga });
                liga.save();
                return true;
            }
        });


};

const getTodasLigas = () => {
    return Liga.findAll()
        .then(data => {
            if (data === null) {
                return false;
            } else {
                return data;
            }
        });
};


const getLigasAdms = ( idUsuarioAdmLiga ) => {

    return sequelize.query("SELECT `rodadaCartola`.`anoTemporada` " +
    ",    `rodadaCartola`.`idRodada` " +
    ",    `rodadaCartola`.`dtFimInscricao` " +
    ",    `rodadaCartola`.`hrFimInscricao` " +
    ",    `rodadaCartola`.`status` " +
    ",    `rodadaCartola`.`valorRodada` " +
    ",    `liga`.`idLiga` " +
    ",    `liga`.`idUsuarioAdmLiga` " +
    ",    `liga`.`nomeLiga` " +
    ",    `liga`.`valorLiga` " +
    ",    `liga`.`tipoLiga` " +
    " FROM `rodadaCartola` " + 
    " left outer join `liga` " +
    " on    `rodadaCartola`.`anoTemporada` = `liga`.`anoTemporada` " +
    " and   `rodadaCartola`.`idRodada` = `liga`.`idRodada` " +
    " where `liga`.`idUsuarioAdmLiga` "  + `= ${idUsuarioAdmLiga} `
        , { type: sequelize.QueryTypes.SELECT }).then(function (data) {
            if (data === null) {
                data = 0;
                return false;
            } else {
                return data;
            }
        });
};



const delLiga = ( anoTemporada, idRodada, idUsuarioAdmLiga, idLiga ) => {
    return Liga.destroy({
        where:
        {
            anoTemporada: anoTemporada,
            idRodada: idRodada,
            idUsuarioAdmLiga: idUsuarioAdmLiga,
            idLiga: idLiga

        }
    })
        .then(function (deletedRecord) {
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



module.exports = {
    cadastrarliga,
    getTodasLigas,
    delLiga,
    getLigasAdms
};
