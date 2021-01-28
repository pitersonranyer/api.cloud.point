const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controller/timeRodadaCartola');


Router.post('/', controller.cadastro);

Router.get('/consultaTimeRodadaCartolaOne/:anoTemporada/:idRodada/:idUsuario/:time_id', autenticarRequisicao, controller.consultaTimeRodadaCartolaOne);

Router.get('/listaTimeRodadaCartolaPorId/:anoTemporada/:idRodada/:idUsuario', autenticarRequisicao, controller.listaTimeRodadaCartolaPorId);

Router.get('/listaTimeRodadaCartolaPorRodada/:anoTemporada/:idRodada',  controller.listaTimeRodadaCartolaPorRodada);

Router.get('/listaTimeRodadaPendentePgto/:anoTemporada/:idRodada', autenticarRequisicao, controller.listaTimeRodadaPendentePgto);


Router.get('/consultaTimeRodadaCartolaCount/:anoTemporada/:idRodada', controller.consultaTimeRodadaCartolaCount);

Router.get('/listaMeusJogosMeusPgtos/:idUsuario', autenticarRequisicao, controller.listaMeusJogosMeusPgtos);

Router.put('/atualizarPontosRodadaCartola',  controller.atualizarPontosRodadaCartola);

Router.put('/atualizarStatusPagamento', autenticarRequisicao, controller.atualizarStatusPagamento);

Router.delete('/cancelarInscricaoTime/:anoTemporada/:idRodada/:idUsuario/:time_id', autenticarRequisicao, controller.cancelarInscricaoTime);

module.exports = Router;
