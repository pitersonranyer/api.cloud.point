const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/competicaoCartola');

Router.post('/', autenticarRequisicao,  controller.cadastro);

Router.get('/listarCompeticaoCartolaAtivas',  controller.listarCompeticaoCartolaAtivas);

Router.delete('/excluirCompeticaoCartolaPorId/:nrSequencialRodadaCartola', autenticarRequisicao,  controller.excluirCompeticaoCartolaPorId);

Router.put('/alterarCompeticaoCartola', autenticarRequisicao, controller.alterarCompeticaoCartola);

module.exports = Router;
