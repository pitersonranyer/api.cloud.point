const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/rodadaCartola');

Router.post('/', autenticarRequisicao, controller.cadastro);

Router.delete('/excluirRodadaCartolaPorId/:anoTemporada/:idRodada', autenticarRequisicao,  controller.excluirRodadaCartolaPorId);

Router.put('/alterarStatusRodada', autenticarRequisicao, controller.alterarStatusRodada);

Router.get('/listarTodasRodadaCartola', controller.listarTodasRodadaCartola);

Router.get('/listarRodadaCartolaAtivas', controller.listarRodadaCartolaAtivas);

Router.get('/listarRodadaCartolaPorId/:anoTemporada/:idRodada', controller.listarRodadaCartolaPorId);

Router.get('/listarRodadaCartolaTemporada/:anoTemporada', controller.listarRodadaCartolaTemporada);

module.exports = Router;
