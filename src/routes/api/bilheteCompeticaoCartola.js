const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/bilheteCompeticaoCartola');

Router.post('/',  controller.cadastro);

Router.get('/listarBilheteGerado', controller.listarBilheteGerado);

Router.put('/alterarStatusBilhete', autenticarRequisicao, controller.alterarStatusBilhete);


module.exports = Router;
