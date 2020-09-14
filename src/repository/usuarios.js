const Usuario = require('../model/usuario');
const { gerarCredenciais } = require('../service/auth');

const cadastrarUsuario = dadosUsuario => {
    return Usuario.findOne({ where: { email: dadosUsuario.email } }).then(psq1 => {
        if (psq1 === null) {
            return Usuario.max('id').then(max => {
                if (Number.isNaN(max)) {
                    max = 0;
                    const numMax = max + 1;
                    dadosUsuario.id = numMax;
                    const credenciais = gerarCredenciais(dadosUsuario.senha);
                    const usuario = new Usuario({ ...dadosUsuario, ...credenciais });
                    usuario.save();
                    return true;
                } else {
                    const numMax = max + 1;
                    dadosUsuario.id = numMax;
                    const credenciais = gerarCredenciais(dadosUsuario.senha);
                    const usuario = new Usuario({ ...dadosUsuario, ...credenciais });
                    usuario.save();
                    return true;
                }
            });
        } else {
            return false
        }
    });
};


// const alterarSenhaUsuario = dadosUsuario => {
//    return Usuario.findOne({ where: { email: dadosUsuario.email } }).then(psq1 => {
//        if (psq1 != null) {

//            const credenciais = gerarCredenciais(dadosUsuario.senha);
//            const usuario = new Usuario({ ...dadosUsuario, ...credenciais });
//            usuario.update();
//            return true;

//        } else {
//            return false
//        }
//    });
// };


module.exports = { cadastrarUsuario };
