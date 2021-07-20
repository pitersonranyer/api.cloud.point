const Router = require('express').Router();
const controller = require('../../controller/atualizarParciais');

Router.get('/atualizarParciais/:nrSequencialRodadaCartola', controller.atualizarParciais);
Router.get('/listarScoutAtletas/:atleta_id', controller.listarScoutAtletas);
module.exports = Router;

