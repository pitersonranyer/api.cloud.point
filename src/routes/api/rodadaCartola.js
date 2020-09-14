const Router = require('express').Router();

const controller = require('../../controller/rodadaCartola');

Router.post('/', controller.cadastro);

Router.delete('/excluirRodadaCartolaPorId/:anoTemporada/:idRodada', controller.excluirRodadaCartolaPorId);

Router.put('/alterarStatusRodada', controller.alterarStatusRodada);

Router.get('/listarTodasRodadaCartola', controller.listarTodasRodadaCartola);

Router.get('/listarRodadaCartolaPorId/:anoTemporada/:idRodada', controller.listarRodadaCartolaPorId);

Router.get('/listarRodadaCartolaTemporada/:anoTemporada', controller.listarRodadaCartolaTemporada);

module.exports = Router;
