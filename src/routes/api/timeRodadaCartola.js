const Router = require('express').Router();

const controller = require('../../controller/timeRodadaCartola');


Router.post('/', controller.cadastro);

Router.get('/consultaTimeRodadaCartolaOne/:anoTemporada/:idRodada/:idUsuario/:time_id', controller.consultaTimeRodadaCartolaOne);

Router.get('/listaTimeRodadaCartolaPorId/:anoTemporada/:idRodada/:idUsuario', controller.listaTimeRodadaCartolaPorId);

Router.get('/listaTimeRodadaCartolaPorRodada/:anoTemporada/:idRodada', controller.listaTimeRodadaCartolaPorRodada);

Router.get('/listaTimeRodadaPendentePgto/:anoTemporada/:idRodada', controller.listaTimeRodadaPendentePgto);


Router.get('/consultaTimeRodadaCartolaCount/:anoTemporada/:idRodada', controller.consultaTimeRodadaCartolaCount);

Router.get('/listaMeusJogosMeusPgtos/:idUsuario', controller.listaMeusJogosMeusPgtos);

Router.put('/atualizarPontosRodadaCartola', controller.atualizarPontosRodadaCartola);

Router.put('/atualizarStatusPagamento', controller.atualizarStatusPagamento);


module.exports = Router;
