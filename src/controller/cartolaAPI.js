const { getTimesCartola, 
    getTimeCartola, 
    getAtletasPontuados, 
    postLoginCartola, 
    getTimeUsuarioLogado,
    getMercadoStatus,
    getTimeInfoCartolaById } = require('../repository/cartolaAPI');


 const loginCartola = (req, res, next) => {
    login = req.body;
    return postLoginCartola(login)
    .then(resLogin => {
        if (!resLogin) {
            return res.status(400).end();
        }
        return res.json(resLogin);
    })
    .catch(error => next(error));
 };

 const buscarTimeUsuarioLogado = (req, res, next) => {
    glbId = req.params.glbId;
    return getTimeUsuarioLogado(glbId)
        .then(meuTime => res.json(meuTime))
        .catch(err => next(err));
};

const listarTimesCartola = (req, res, next) => {
    time = req.params.time;
    return getTimesCartola(time)
        .then(times => res.json(times))
        .catch(err => next(err));
};

const consultarTimeCartola = (req, res, next) => {
    idTime = req.params.idTime;
    return getTimeCartola(idTime)
        .then(time => res.json(time))
        .catch(err => next(err));
};


const consultarTimeInfoCartolaById = (req, res, next) => {
    idTime = req.params.idTime;
    return getTimeInfoCartolaById(idTime)
        .then(time => res.json(time))
        .catch(err => next(err));
};




const listarAtletasPontuados = (req, res, next) => {
    return getAtletasPontuados()
        .then(atletas => res.json(atletas))
        .catch(err => next(err));
};

const consultarMercadoStatus = (req, res, next) => {
    return getMercadoStatus()
        .then(status => res.json(status))
        .catch(err => next(err));
};




module.exports = {
    listarTimesCartola,
    consultarTimeCartola,
    listarAtletasPontuados,
    loginCartola,
    buscarTimeUsuarioLogado,
    consultarMercadoStatus,
    consultarTimeInfoCartolaById
};