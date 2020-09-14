const Router = require('express').Router();

const controller = require('../../controller/cartolaAPI');

Router.post('/loginCartola', controller.loginCartola); 

Router.get('/buscarTimeUsuarioLogado/:glbId', controller.buscarTimeUsuarioLogado);

Router.get('/listarAtletasPontuados', controller.listarAtletasPontuados);

Router.get('/listarTimesCartola/:time', controller.listarTimesCartola);

Router.get('/consultarTimeCartola/:idTime', controller.consultarTimeCartola);

module.exports = Router;

