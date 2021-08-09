const {
  getScoutAtletas , putAtualizarParciais } = require('../repository/atualizarParciais');




const atualizarParciais = async (req, res, next) => {
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
  const rodada_atual = req.params.rodada_atual

  return putAtualizarParciais(nrSequencialRodadaCartola, rodada_atual)

    .then(atu => res.json(atu))
    .catch(err => next(err));
};

const listarScoutAtletas = async (req, res, next) => {
  const atleta_id = req.params.atleta_id;
  const nrRodada = req.params.nrRodada;

  return getScoutAtletas(atleta_id, nrRodada)

    .then(atu => res.json(atu))
    .catch(err => next(err));
};




module.exports = {

  atualizarParciais,
  listarScoutAtletas

};