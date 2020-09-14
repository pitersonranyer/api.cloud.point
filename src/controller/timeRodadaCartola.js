const {
    cadastrarTimeRodadaCartola,
    getTimeRodadaCartolaOne,
    getTimeRodadaCartolaPorId,
    getTimeRodadaCartolaPorRodada,
    getTimeRodadaCartolaCount,
    putPontosRodadaCartola,
    putStatusPgtoTimeCartola,
    getMeusJogosMeusPgtos,
    getTimeRodadaPendentePgto
} = require('../repository/timeRodadaCartola');

const cadastro = (req, res, next) => {
    const dadosTimeRodadaCartola = req.body;
    return cadastrarTimeRodadaCartola(dadosTimeRodadaCartola)
        .then(timeRodadaCartola => {
            if (!timeRodadaCartola) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};



const consultaTimeRodadaCartolaOne = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    const idUsuario = req.params.idUsuario;
    const time_id = req.params.time_id;
    return getTimeRodadaCartolaOne(anoTemporada, idRodada, idUsuario, time_id)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};

const listaTimeRodadaCartolaPorId = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    const idUsuario = req.params.idUsuario;
    return getTimeRodadaCartolaPorId(anoTemporada, idRodada, idUsuario)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};

// Classificacao geral
const listaTimeRodadaCartolaPorRodada = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    return getTimeRodadaCartolaPorRodada(anoTemporada, idRodada)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};

// Lista de Time Pendente de Pagamento
const listaTimeRodadaPendentePgto = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    return getTimeRodadaPendentePgto(anoTemporada, idRodada)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};

// Total de inscritos
const consultaTimeRodadaCartolaCount = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idRodada = req.params.idRodada;
    return getTimeRodadaCartolaCount(anoTemporada, idRodada)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};

const atualizarPontosRodadaCartola = (req, res, next) => {
    const dadosTimeRodadaCartola = req.body;
    return putPontosRodadaCartola(dadosTimeRodadaCartola)
        .then(timeRodadaCartola => {
            if (!timeRodadaCartola) {
                return res.status(404).end();
            }
            return res.status(200).end();
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
};

const atualizarStatusPagamento = (req, res, next) => {
    const dadosTimeRodadaCartola = req.body;
    return putStatusPgtoTimeCartola(dadosTimeRodadaCartola)
        .then(timeRodadaCartola => {
            if (!timeRodadaCartola) {
                return res.status(404).end();
            }
            return res.status(200).end();
        })
        .catch(function (error) {
            res.status(500).json(error);
        });
};

const listaMeusJogosMeusPgtos = (req, res, next) => {
    const idUsuario = req.params.idUsuario;
    return getMeusJogosMeusPgtos(idUsuario)
        .then(timeRodadaCartola => res.json(timeRodadaCartola))
        .catch(err => next(err));
};



module.exports = {
    cadastro,
    consultaTimeRodadaCartolaOne,
    listaTimeRodadaCartolaPorId,
    listaTimeRodadaCartolaPorRodada,
    consultaTimeRodadaCartolaCount,
    atualizarPontosRodadaCartola,
    atualizarStatusPagamento,
    listaMeusJogosMeusPgtos,
    listaTimeRodadaPendentePgto
    
};

