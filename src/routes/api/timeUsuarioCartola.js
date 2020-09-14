const Router = require('express').Router();

const controller = require('../../controller/timeUsuarioCartola');

Router.post('/', controller.cadastro);

Router.delete('/excluirTimeUsuarioCartola/:idu/:idt', controller.excluirTimeUsuarioCartola);

Router.get('/listarTodosTimesCartola', controller.listarTodosTimesCartola);

Router.get('/listarTimesUsuarioCartola/:id', controller.listarTimesUsuarioCartola);

Router.get('/listarTimesUsuarioCartolaRodada/:anoTemporada/:idUsuario/:idRodada', controller.listarTimesUsuarioCartolaRodada);

module.exports = Router;
