const {
  cadastrarPontuacaoTimeRodada,
} = require('../repository/pontuacaoTimeRodada');

const cadastro = (req, res, next) => {
    const dadosPontuacaoTimeRodada = req.body;
    return cadastrarPontuacaoTimeRodada(dadosPontuacaoTimeRodada)
        .then(pontuacaoTimeRodada => {
            if (!pontuacaoTimeRodada) {
                return res.status(409).end();
            }

            return res.status(200).end();
        })
        .catch(error => next(error));
};


module.exports = {
    cadastro
};

