const Router = require('express').Router();
const { autenticarRequisicao } = require('../../middleware/auth');

const controller = require('../../controller/timeBilheteCompeticaoCartola');

Router.post('/',  controller.cadastro);
Router.get('/listarTimeBilheteGerado/:nrContatoUsuario/:nrSequencialRodadaCartola', controller.listarTimeBilheteGerado);
Router.delete('/excluirTimeBilhete/:idBilhete/:time_id', controller.excluirTimeBilhete);
Router.get('/listarTimesDaCompeticao/:nrSequencialRodadaCartola', controller.listarTimesDaCompeticao);
Router.get('/consultaTimeCompeticaoCount/:nrSequencialRodadaCartola', controller.consultaTimeCompeticaoCount);

module.exports = Router;
