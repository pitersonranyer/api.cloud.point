const Router = require('express').Router();
const controller = require('../../controller/usuarioComum');
const { autenticarRequisicao } = require('../../middleware/auth');

Router.get('/todos', autenticarRequisicao, controller.listar);
Router.get('/consultarUsuarioPorLogin', autenticarRequisicao, controller.consultarUsuarioPorLogin); 
Router.get('/:id', autenticarRequisicao, controller.consultarUsuario); 
Router.put('/atualizar', autenticarRequisicao, controller.atualizar);

module.exports = Router;
