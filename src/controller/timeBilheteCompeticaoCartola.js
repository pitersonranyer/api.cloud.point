const {
  cadastrarTimeBilhete,
  getTimeBilheteGerado,
  delTimeBilhete,
  getTimesDaCompeticao,
  getTimeCompeticaoCount,
  getTimeBilhetePorCodigo,
  putPontosTimeBilhete
} = require('../repository/timeBilheteCompeticaoCartola');


const cadastro = (req, res, next) => {
  const dadosTimeBilhete = req.body;


  return cadastrarTimeBilhete(dadosTimeBilhete)
    .then(dadosTimeBilhete => {
      if (!dadosTimeBilhete) {
        return res.status(409).end();
      }

      return res.status(200).end();
    })
    .catch(error => next(error));
};

const listarTimeBilheteGerado = (req, res, next) => {
  const nrContatoUsuario = req.params.nrContatoUsuario;
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
  return getTimeBilheteGerado(nrContatoUsuario, nrSequencialRodadaCartola)
    .then(timeBilhete => res.json(timeBilhete))
    .catch(err => next(err));
};


const excluirTimeBilhete = (req, res, next) => {
  const idBilhete = req.params.idBilhete;
  const time_id = req.params.time_id;
  return delTimeBilhete(idBilhete, time_id)
    .then(timeBilhete => {
      if (!timeBilhete) {
        return res.status(404).end();
      }
      return res.status(200).end();
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
};


const listarTimesDaCompeticao = (req, res, next) => {
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
  return getTimesDaCompeticao(nrSequencialRodadaCartola)
    .then(timeCompeticao => res.json(timeCompeticao))
    .catch(err => next(err));
};


// Total de inscritos
const consultaTimeCompeticaoCount = (req, res, next) => {
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
  return getTimeCompeticaoCount(nrSequencialRodadaCartola)
    .then(totalTime => res.json(totalTime))
    .catch(err => next(err));
};


const consultarTimeBilhetePorCodigo = (req, res, next) => {
  const codigoBilhete = req.params.codigoBilhete;
  return getTimeBilhetePorCodigo(codigoBilhete)
    .then(timeBilhete => res.json(timeBilhete))
    .catch(err => next(err));
};

const atualizarPontosTimeBilhete = (req, res, next) => {
  const dadosTimeBilhete = req.body;
  return putPontosTimeBilhete(dadosTimeBilhete)
      .then(TimeBilhete => {
          if (!TimeBilhete) {
              return res.status(404).end();
          }
          return res.status(200).end();
      })
      .catch(function (error) {
          res.status(500).json(error);
      });
};



module.exports = {
  cadastro,
  listarTimeBilheteGerado,
  excluirTimeBilhete,
  listarTimesDaCompeticao,
  consultaTimeCompeticaoCount,
  consultarTimeBilhetePorCodigo,
  atualizarPontosTimeBilhete
};