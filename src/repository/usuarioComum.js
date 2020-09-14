const Usuario = require('../model/usuario');

const consultaPorId = (id) => {
    return Usuario.findByPk(id).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};


const getByLogin = (login) => {
    return Usuario.findOne({ where: { email: login } }).then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};

const alterarDadosUsuario = dadosUsuario => {
    const id = dadosUsuario._id;
    const nome = dadosUsuario.nome;
    const email = dadosUsuario.email;
    const contato = dadosUsuario.contato;
    const timeFavorito = dadosUsuario.timeFavorito;
    const saldo = dadosUsuario.saldo;
    const admin = dadosUsuario.admin;

    return Usuario.update(
        {
            nome: nome,
            email: email,
            contato: contato,
            timeFavorito: timeFavorito,
            saldo: saldo,
            admin: admin
        },
        { where: { id: id } }
    ).then(function (updatedRecord) {
        if (updatedRecord) {
            return true;
        }
        else {
            return false;
        }
    });
};

const listarTodos = () => {
    return Usuario.findAll().then(data => {
        if (data === null) {
            return false;
        } else {
            return data;
        }
    });
};


module.exports = { consultaPorId, alterarDadosUsuario, listarTodos, getByLogin}; 
