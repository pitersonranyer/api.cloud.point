const Router = require('express').Router();
const controller = require('../../controller/atualizarParciais');

Router.get('/atualizarParciais/:nrSequencialRodadaCartola', controller.atualizarParciais);

module.exports = Router;

