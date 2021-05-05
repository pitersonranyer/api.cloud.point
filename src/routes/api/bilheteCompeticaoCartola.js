const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/bilheteCompeticaoCartola');

Router.post('/',  controller.cadastro);

Router.get('/listarBilheteGeradoId/:idUsuarioAdmLiga', autenticarRequisicao, controller.listarBilheteGeradoId);

Router.get('/listarBilheteGerado', controller.listarBilheteGerado);

Router.put('/alterarStatusBilhete', autenticarRequisicao, controller.alterarStatusBilhete);

Router.delete('/excluirBilhete/:idBilhete', controller.excluirBilhete);




module.exports = Router;
