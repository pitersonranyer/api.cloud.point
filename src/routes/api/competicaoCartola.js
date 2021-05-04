const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/competicaoCartola');

Router.get('/listarCompeticaoCartolaAtivas',  controller.listarCompeticaoCartolaAtivas);

Router.get('/listarCompeticaoCartolaAtivasId/:idUsuarioAdmLiga', autenticarRequisicao, controller.listarCompeticaoCartolaAtivasId);

Router.post('/', autenticarRequisicao,  controller.cadastro);

Router.delete('/excluirCompeticaoCartolaPorId/:nrSequencialRodadaCartola', autenticarRequisicao,  controller.excluirCompeticaoCartolaPorId);

Router.put('/alterarCompeticaoCartola', autenticarRequisicao, controller.alterarCompeticaoCartola);

module.exports = Router;
