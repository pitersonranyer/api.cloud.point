const {
    cadastrarRodadaCartola,
    getTodasRodadaCartola,
    getRodadaCartolaPorId,
    delRodadaCartolaPorId,
    getRodadaCartolaPorTemporada,
    putStatusRodadaCartola
} = require('../repository/rodadaCartola');

const cadastro = (req, res, next) => {
    const dadosRodadaCartola = req.body;
    return cadastrarRodadaCartola(dadosRodadaCartola)
        .then(rodadaCartola => {
            if (!rodadaCartola) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};

const listarTodasRodadaCartola = (req, res, next) => {
    return getTodasRodadaCartola()
        .then(rodadasCartola => res.json(rodadasCartola))
        .catch(err => next(err));
};

const listarRodadaCartolaPorId = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    return getRodadaCartolaPorId(anoTemporada, idRodada)
        .then(rodadaCartola => res.json(rodadaCartola))
        .catch(err => next(err));
};

const listarRodadaCartolaTemporada = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    return getRodadaCartolaPorTemporada(anoTemporada)
        .then(rodadaCartola => res.json(rodadaCartola))
        .catch(err => next(err));
};


const excluirRodadaCartolaPorId = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    return delRodadaCartolaPorId(anoTemporada, idRodada)
        .then(rodadaCartola => {
            if (!rodadaCartola) {
                return res.status(404).end();
            }
            return res.status(200).end();
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
};

const alterarStatusRodada = (req, res, next) => {
    const dadosRodadaCartola = req.body;
    return putStatusRodadaCartola(dadosRodadaCartola)
        .then(rodadaCartola => {
            if (!rodadaCartola) {
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
    listarTodasRodadaCartola,
    listarRodadaCartolaPorId,
    excluirRodadaCartolaPorId,
    listarRodadaCartolaTemporada,
    alterarStatusRodada
};

