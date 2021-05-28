const Router = require('express').Router();

const usuariosRouter = require('./usuarios');
const usuarioComumRouter = require('./usuarioComum');
const timeUsuarioCartolaRouter = require('./timeUsuarioCartola');
const rodadaCartolaRouter = require('./rodadaCartola');
const timeRodadaCartolaRouter = require('./timeRodadaCartola');
const timesRouter = require('./times');
const cartolaAPIrouter = require('./cartolaAPI');
const authRouter = require('./auth');
const ligaRouter = require('./liga');
const timeLigaRouter = require('./timeLiga');


const competicaoCartolaRouter = require('./competicaoCartola');
const bilheteCompeticaoCartolaRouter = require('./bilheteCompeticaoCartola');
const timeBilheteCompeticaoCartolaRouter = require('./timeBilheteCompeticaoCartola');
const historicoTimeUsuarioRouter = require('./historicoTimeUsuario')
const pontuacaoTimeRodadaRouter = require('./pontuacaoTimeRodada')


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

    liga: {
      caminho: '/liga'
    },

    timeLiga: {
      caminho: '/timeLiga'
    },
    timeRodadaCartola: {
      caminho: '/timeRodadaCartola'
    },
    autenticacao: {
      caminho: '/auth'
    },




    competicaoCartola: {
      caminho: '/competicaoCartola'
    },
    bilheteCompeticaoCartola: {
      caminho: '/bilheteCompeticaoCartola'
    },
    timeBilheteCompeticaoCartola: {
      caminho: '/timeBilheteCompeticaoCartola'
    },
    historicoTimeUsuario: {
      caminho: '/historicoTimeUsuario'
    },

    pontuacaoTimeRodada: {
      caminho: '/pontuacaoTimeRodada'
    },



    
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
Router.use('/liga', ligaRouter);
Router.use('/timeLiga', timeLigaRouter);
Router.use('/auth', authRouter);


Router.use('/competicaoCartola', competicaoCartolaRouter);
Router.use('/bilheteCompeticaoCartola', bilheteCompeticaoCartolaRouter);
Router.use('/timeBilheteCompeticaoCartola', timeBilheteCompeticaoCartolaRouter);
Router.use('/historicoTimeUsuario', historicoTimeUsuarioRouter);

Router.use('/pontuacaoTimeRodada', pontuacaoTimeRodadaRouter);



module.exports = Router;
