const {
    cadastrarTimeLiga,
    getTimeLigaPorRodada
} = require('../repository/timeLiga');

const cadastro = (req, res, next) => {
    const dadosTimeLiga = req.body;
    return cadastrarTimeLiga(dadosTimeLiga)
        .then(TimeLiga => {
            if (!TimeLiga) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};

const listarTimeLigaPorRodada = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    const idUsuarioAdmLiga = req.params.idUsuarioAdmLiga;
    const idLiga = req.params.idLiga;
    
    return getTimeLigaPorRodada(anoTemporada, idRodada, idUsuarioAdmLiga, idLiga)
        .then(timeLiga => res.json(timeLiga))
        .catch(err => next(err));
};


module.exports = {
    cadastro,
    listarTimeLigaPorRodada
};

