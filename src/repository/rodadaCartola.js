const RodadaCartola = require('../model/rodadaCartola');

const cadastrarRodadaCartola = dadosRodadaCartola => {
    return RodadaCartola.findOne({
        where:
        {
            anoTemporada: dadosRodadaCartola.anoTemporada,
            idRodada: dadosRodadaCartola.idRodada
        }
    })
        .then(psq1 => {
            if (psq1 === null) {

                const rodadaCartola = new RodadaCartola({ ...dadosRodadaCartola });
                rodadaCartola.save();
                return true;

            } else {
                return false
            }
        });
};

const getTodasRodadaCartola = () => {
    return RodadaCartola.findAll()
        .then(data => {
            if (data === null) {
                return false;
            } else {
                return data;
            }
        });
};

const getRodadaCartolaPorId = (anoTemporada, idRodada) => {

    return RodadaCartola.findAll({
        where:
        {
            anoTemporada: anoTemporada,
            idRodada: idRodada
        }
    }).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};

const getRodadaCartolaPorTemporada = (anoTemporada) => {

    return RodadaCartola.findOne({
        where:
        {
            anoTemporada: anoTemporada,
        },
        order: [
            ['idRodada', 'DESC']
        ]
    }).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};


const delRodadaCartolaPorId = (anoTemporada, idRodada) => {
    return RodadaCartola.destroy({
        where:
        {
            anoTemporada: anoTemporada,
            idRodada: idRodada
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

const putStatusRodadaCartola = dadosRodadaCartola => {
    const anoTemporada = dadosRodadaCartola.anoTemporada;
    const idRodada = dadosRodadaCartola.idRodada;
    const status = dadosRodadaCartola.status;

    return RodadaCartola.update(
        { status: status },
        {
            where: {
                anoTemporada: anoTemporada,
                idRodada: idRodada
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

module.exports = {
    cadastrarRodadaCartola,
    getTodasRodadaCartola,
    getRodadaCartolaPorId,
    delRodadaCartolaPorId,
    getRodadaCartolaPorTemporada,
    putStatusRodadaCartola
};
