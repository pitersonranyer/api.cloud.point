const {
    cadastrarliga,
    getTodasLigas,
    delLiga,
    getLigasAdms
} = require('../repository/liga');

const cadastro = (req, res, next) => {
    const dadosLiga = req.body;
    return cadastrarliga(dadosLiga)
        .then(liga => {
            if (!liga) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};

const listarTodasLigas = (req, res, next) => {
    return getTodasLigas()
        .then(ligas => res.json(ligas))
        .catch(err => next(err));
};


const listarLigasAdms = (req, res, next) => {
    const idUsuarioAdmLiga = req.params.idUsuarioAdmLiga;
    return getLigasAdms(idUsuarioAdmLiga)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};


const excluirLiga = (req, res, next) => {

    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    const idUsuarioAdmLiga = req.params.idUsuarioAdmLiga;
    const idLiga = req.params.idLiga;

    return delLiga(anoTemporada, idRodada, idUsuarioAdmLiga, idLiga)
        .then(liga => {
            if (!liga) {
                return res.status(404).end();
            }
            return res.status(200).end();
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
};

module.exports = {
    cadastro,
    listarTodasLigas,
    excluirLiga,
    listarLigasAdms
};

