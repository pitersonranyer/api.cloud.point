const {
  putParciais , putAtualizarParciais } = require('../repository/atualizarParciais');




const atualizarParciais = (req, res, next) => {
  const nrSequencialRodadaCartola = req.params.nrSequencialRodadaCartola;
//  return putParciais(nrSequencialRodadaCartola)
  return putAtualizarParciais(nrSequencialRodadaCartola)

    .then(atu => res.json(atu))
    .catch(err => next(err));
};

module.exports = {

  atualizarParciais

};