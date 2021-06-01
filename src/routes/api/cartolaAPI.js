const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');
const controller = require('../../controller/cartolaAPI');

Router.post('/loginCartola', controller.loginCartola); 

Router.get('/buscarTimeUsuarioLogado/:glbId', controller.buscarTimeUsuarioLogado);

Router.get('/listarAtletasPontuados',  controller.listarAtletasPontuados);

Router.get('/listarTimesCartola/:time',  controller.listarTimesCartola);

Router.get('/consultarTimeCartola/:idTime',  controller.consultarTimeCartola);

Router.get('/consultarTimeInfoCartolaById/:idTime',  controller.consultarTimeInfoCartolaById);

Router.get('/consultarMercadoStatus/', controller.consultarMercadoStatus);

Router.get('/consultarBancoDeReservas/:time_id/:nrRodada',  controller.consultarBancoDeReservas);

module.exports = Router;

