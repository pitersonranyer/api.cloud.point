const {
  cadastrarHistoricoTimeUsuario,
  getTimesUsuario,
  delHistoricoTimeUsuario,
  getTimesUsuarioMobile
} = require('../repository/historicoTimeUsuario');


const cadastro = (req, res, next) => {
  const dadosHistoricoTimeUsuario = req.body;

  return cadastrarHistoricoTimeUsuario(dadosHistoricoTimeUsuario)
    .then(historicoTimeUsuario => {
      if (!historicoTimeUsuario) {
        return res.status(409).end();
      }

      return res.status(200).end();
    })
    .catch(error => next(error));
};


const listarTimesUsuario = (req, res, next) => {
  const nrContatoUsuario = req.params.nrContatoUsuario;
  return getTimesUsuario(nrContatoUsuario)
    .then(timesUsuario => res.json(timesUsuario))
    .catch(err => next(err));
};

const excluirTimeUsuario = (req, res, next) => {
  const time_id = req.params.time_id;
  return delHistoricoTimeUsuario(time_id)
    .then(timesUsuario => {
      if (!timesUsuario) {
        return res.status(404).end();
      }
      return res.status(200).end();
    })
    .catch(function (error) {
      res.status(500).json(error);
    });
};


const listarTimesUsuarioMobile = async (req, res, next) => {
  const nrContatoUsuario = req.params.nrContatoUsuario;
  return getTimesUsuarioMobile(nrContatoUsuario)
    .then(timesUsuario => res.json(timesUsuario))
    .catch(err => next(err));
};

module.exports = {
  cadastro,
  listarTimesUsuario,
  excluirTimeUsuario,
  listarTimesUsuarioMobile
};

