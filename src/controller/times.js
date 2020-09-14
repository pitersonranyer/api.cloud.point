const {  listarTodos, consultaPorId } = require('../repository/times');

const listar = (req, res, next) => {
    return listarTodos()
        .then(times => res.json(times))
        .catch(err => next(err));
};

const consultar = (req, res, next) => {
    const id = req.params.id;
    return consultaPorId(id)
        .then(times => res.json(times))
        .catch(err => next(err));
};


module.exports = { consultar, listar };

