const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/liga');

Router.post('/',  controller.cadastro);

Router.get('/listarTodasLigas',  controller.listarTodasLigas);

Router.get('/listarLigasAdms/:idUsuarioAdmLiga',  controller.listarLigasAdms);

Router.delete('/excluirLiga/:anoTemporada/:idRodada/:idUsuarioAdmLiga/:idLiga',   controller.excluirLiga);

module.exports = Router;
