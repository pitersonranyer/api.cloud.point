const { cadastrarTimeUsuarioCartola,
    getTodosTimesCartola,
    getTimesUsuarioCartola,
    getTimesUsuarioCartolaRodada,
    delTimeUsuarioCartola } = require('../repository/timeUsuarioCartola');

const cadastro = (req, res, next) => {
    const dadosTimeUsuarioCartola = req.body;
    return cadastrarTimeUsuarioCartola(dadosTimeUsuarioCartola)
        .then(timeUsuarioCartola => {
            if (!timeUsuarioCartola) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};

const listarTodosTimesCartola = (req, res, next) => {
    return getTodosTimesCartola()
        .then(timesCartola => res.json(timesCartola))
        .catch(err => next(err));
};

const listarTimesUsuarioCartola = (req, res, next) => {
    const id = req.params.id;
    return getTimesUsuarioCartola(id)
        .then(timesUsuarioCartola => res.json(timesUsuarioCartola))
        .catch(err => next(err));
};

const listarTimesUsuarioCartolaRodada = (req, res, next) => {
    const anoTemporada = req.params.anoTemporada;
    const idUsuario = req.params.idUsuario;
    const idRodada = req.params.idRodada;
    return getTimesUsuarioCartolaRodada(anoTemporada, idUsuario, idRodada)
        .then(timesUsuarioCartola => res.json(timesUsuarioCartola))
        .catch(err => next(err));
};


const excluirTimeUsuarioCartola = (req, res, next) => {
    // idu = IdUsuario
    // idt = time_id
    const idu = req.params.idu;
    const idt = req.params.idt;
    return delTimeUsuarioCartola(idu, idt)
        .then(timeCartola => {
            if (!timeCartola) {
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
    listarTodosTimesCartola,
    listarTimesUsuarioCartola,
    listarTimesUsuarioCartolaRodada,
    excluirTimeUsuarioCartola
};

