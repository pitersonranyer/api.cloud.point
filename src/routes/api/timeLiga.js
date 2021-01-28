const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/timeLiga');

Router.post('/',  controller.cadastro);

Router.get('/listarTimeLigaPorRodada/:anoTemporada/:idRodada/:idUsuarioAdmLiga/:idLiga', controller.listarTimeLigaPorRodada);

module.exports = Router;
