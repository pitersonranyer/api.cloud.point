const Router = require('express').Router();
const controller = require('../../controller/atualizarParciais');

Router.get('/atualizarParciais/:nrSequencialRodadaCartola', controller.atualizarParciais);
Router.get('/listarScoutAtletas/:atleta_id/:nrRodada', controller.listarScoutAtletas);
module.exports = Router;

