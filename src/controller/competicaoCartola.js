const {
    cadastrarCompeticaoCartola,
    getCompeticaoCartolaAtivas,
    delCompeticaoCartolaPorId,
    putCompeticaoCartola
} = require('../repository/competicaoCartola');

const cadastro = (req, res, next) => {
    const dadosCompeticaoCartola = req.body;
    return cadastrarCompeticaoCartola(dadosCompeticaoCartola)
        .then(competicaoCartola => {
            if (!competicaoCartola) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};

const listarCompeticaoCartolaAtivas = (req, res, next) => {
  return getCompeticaoCartolaAtivas()
      .then(competicaoCartola => res.json(competicaoCartola))
      .catch(err => next(err));
};

const excluirCompeticaoCartolaPorId = (req, res, next) => {
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
  return delCompeticaoCartolaPorId(nrSequencialRodadaCartola)
      .then(competicaoCartola => {
          if (!competicaoCartola) {
              return res.status(404).end();
          }
          return res.status(200).end();
      })
      .catch(function (error) {
          res.status(500).json(error);
      });
};

const alterarCompeticaoCartola = (req, res, next) => {
  const dadosCompeticaoCartola = req.body;
  return putCompeticaoCartola(dadosCompeticaoCartola)
      .then(competicaoCartola => {
          if (!competicaoCartola) {
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
    listarCompeticaoCartolaAtivas,
    excluirCompeticaoCartolaPorId,
    alterarCompeticaoCartola
};

