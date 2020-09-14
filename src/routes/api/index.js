const Router = require('express').Router();

const usuariosRouter = require('./usuarios');
const usuarioComumRouter = require('./usuarioComum');
const timeUsuarioCartolaRouter = require('./timeUsuarioCartola');
const rodadaCartolaRouter = require('./rodadaCartola');
const timeRodadaCartolaRouter = require('./timeRodadaCartola');
const timesRouter = require('./times');
const cartolaAPIrouter = require('./cartolaAPI');
const authRouter = require('./auth');



const endpoints = {
    message: 'essa é a API da nossa rede social!',
    endpoints: {
        usuarios: {
            caminho: '/usuarios'
        },
        times: {
            caminho: '/times'
        },
        usuarioComum: {
            caminho: '/usuarioComum'
        },
        cartolaAPI: {
            caminho: '/cartolaAPI'
        },
        timeUsuarioCartola: {
            caminho: '/timeUsuarioCartola'
        },
        rodadaCartola: {
            caminho: '/rodadaCartola'
        },
        timeRodadaCartola: {
            caminho: '/timeRodadaCartola'
        },
        autenticacao: {
            caminho: '/auth'
        }
    }
};

Router.get('/', (req, res, next) => res.json(endpoints));
Router.use('/usuarios', usuariosRouter);
Router.use('/times', timesRouter);
Router.use('/usuarioComum', usuarioComumRouter);
Router.use('/cartolaAPI', cartolaAPIrouter);
Router.use('/timeUsuarioCartola', timeUsuarioCartolaRouter);
Router.use('/rodadaCartola', rodadaCartolaRouter);
Router.use('/timeRodadaCartola', timeRodadaCartolaRouter);
Router.use('/auth', authRouter);

module.exports = Router;
