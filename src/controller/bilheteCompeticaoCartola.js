const {
  cadastrarBilhete,
  getBilheteGerado,
  putStatusBilhete,
  getBilheteGeradoId,
  delBilhete,
  cadastrarBilhetePorIds
} = require('../repository/bilheteCompeticaoCartola');


const cadastro = async (req, res, next) => {
    const dadosBilhete = req.body;
    return cadastrarBilhete(dadosBilhete)
        .then(bilhete => {
            if (!bilhete) {
                return res.status(409).end();
            }

            return res.json(bilhete);
        })
        .catch(error => next(error));
};


const cadastroPorId = async (req, res, next) => {
  const dadosBilhete = req.body;
  return cadastrarBilhetePorIds(dadosBilhete)
      .then(bilhete => {
          if (!bilhete) {
              return res.status(409).end();
          }

          return res.json(bilhete);
      })
      .catch(error => next(error));
};


const listarBilheteGerado = (req, res, next) => {
  return getBilheteGerado()
      .then(bilhete => res.json(bilhete))
      .catch(err => next(err));
};

const listarBilheteGeradoId = (req, res, next) => {
  const idUsuarioAdmLiga = req.params.idUsuarioAdmLiga;
  return getBilheteGeradoId(idUsuarioAdmLiga)
      .then(bilhete => res.json(bilhete))
      .catch(err => next(err));
};


const alterarStatusBilhete = (req, res, next) => {
  const dadosBilhete = req.body;
  return putStatusBilhete(dadosBilhete)
      .then(bilhete => {
          if (!bilhete) {
              return res.status(404).end();
          }
          return res.status(200).end();
      })
      .catch(function (error) {
          res.status(500).json(error);
      });
};


const excluirBilhete = (req, res, next) => {
  const idBilhete = req.params.idBilhete;
  return delBilhete(idBilhete)
    .then(bilhete => {
      if (!bilhete) {
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
    listarBilheteGerado,
    alterarStatusBilhete,
    listarBilheteGeradoId,
    excluirBilhete,
    cadastroPorId
};