const Router = require('express').Router();
// versão
const controller = require('../../controller/usuarioComum');

Router.get('/todos', controller.listar);
Router.get('/consultarUsuarioPorLogin', controller.consultarUsuarioPorLogin); 
Router.get('/:id', controller.consultarUsuario); 
Router.put('/atualizar', controller.atualizar);

module.exports = Router;
