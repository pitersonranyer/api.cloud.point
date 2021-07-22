const {
  getScoutAtletas , putAtualizarParciais } = require('../repository/atualizarParciais');




const atualizarParciais = async (req, res, next) => {
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
//  return putParciais(nrSequencialRodadaCartola)
  return putAtualizarParciais(nrSequencialRodadaCartola)

    .then(atu => res.json(atu))
    .catch(err => next(err));
};

const listarScoutAtletas = async (req, res, next) => {
  const atleta_id = req.params.atleta_id;

  return getScoutAtletas(atleta_id)

    .then(atu => res.json(atu))
    .catch(err => next(err));
};




module.exports = {

  atualizarParciais,
  listarScoutAtletas

};