const BlackList = require('../model/blackList');
const Usuario = require('../model/usuario');


const { gerarJWT, senhaConfere } = require('../service/auth');

const logout = token => {
    return BlackList.findOne({ where: { token } }).then(listado => {
        if (listado === null) {
            const listedToken = new BlackList({ token });
            listedToken.save();
        }
    });
};


const checarToken = token => {
    return BlackList.findOne({ where: { token } }).then(listado => listado != null);
};


const login = (email, senha) => {
    email  =  email.toLowerCase();
    return Usuario.findOne({ where: { email } }).then(cadastrado => {
        
        if (cadastrado && senhaConfere(senha, cadastrado)) {

            return gerarJWT(
                cadastrado.id,
                cadastrado.email,
                cadastrado.nome,
                cadastrado.contato,
                cadastrado.timeFavorito,
                cadastrado.saldo,
                cadastrado.admin
            );
            
        }
        return false;
    });
};

module.exports = { logout, checarToken, login };
