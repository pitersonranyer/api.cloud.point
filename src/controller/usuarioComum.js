const { consultaPorId, alterarDadosUsuario, listarTodos, getByLogin } = require('../repository/usuarioComum');

const consultarUsuario = (req, res, next) => {
    const id = req.params.id;
    return consultaPorId(id)
        .then(usuario => res.json(usuario))
        .catch(err => next(err));
};

const consultarUsuarioPorLogin = (req, res, next) => {

    const login = req.query.login;
    
    return getByLogin(login)
        .then(usuario => res.json(usuario))
        .catch(err => next(err));
};



const atualizar = (req, res, next) => {
    const dadosUsuario = req.body;
    return alterarDadosUsuario(dadosUsuario)
    .then(usuario => {
        if (!usuario) {
            return res.status(404).end();
        }
        return res.status(200).end();
    })
    .catch(function (error){
        res.status(500).json(error);
    });
};

const listar = (req, res, next) => {
    return listarTodos()
        .then(usuarios => res.json(usuarios))
        .catch(err => next(err));
};


module.exports = { consultarUsuario , atualizar, listar, consultarUsuarioPorLogin}; 
