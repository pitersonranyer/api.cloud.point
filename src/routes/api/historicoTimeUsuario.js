const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/historicoTimeUsuario');

Router.post('/',  controller.cadastro);

Router.get('/listarTimesUsuario/:nrContatoUsuario', controller.listarTimesUsuario);

Router.delete('/excluirTimeUsuario/:time_id', controller.excluirTimeUsuario);

Router.get('/listarTimesUsuarioMobile/:nrContatoUsuario', controller.listarTimesUsuarioMobile);


module.exports = Router;
