const Router = require('express').Router();

const controller = require('../../controller/timeUsuarioCartola');
const { autenticarRequisicao } = require('../../middleware/auth');

Router.post('/', autenticarRequisicao, controller.cadastro);

Router.delete('/excluirTimeUsuarioCartola/:idu/:idt', autenticarRequisicao, controller.excluirTimeUsuarioCartola);

Router.get('/listarTodosTimesCartola',  autenticarRequisicao, controller.listarTodosTimesCartola);

Router.get('/listarTimesUsuarioCartola/:id',  autenticarRequisicao, controller.listarTimesUsuarioCartola);

Router.get('/listarTimesUsuarioCartolaRodada/:anoTemporada/:idUsuario/:idRodada',  autenticarRequisicao, controller.listarTimesUsuarioCartolaRodada);

module.exports = Router;
