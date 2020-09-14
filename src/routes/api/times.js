const Router = require('express').Router();

const controller = require('../../controller/times');

Router.get('/todos', controller.listar);
Router.get('/:id', controller.consultar);

module.exports = Router;
