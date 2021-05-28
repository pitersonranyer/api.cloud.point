const PontuacaoTimeRodada = require('../model/pontuacaoTimeRodada');
const { Op } = require("sequelize");

const cadastrarPontuacaoTimeRodada = dadosPontuacaoTimeRodada => {
  return PontuacaoTimeRodada.findOne({
    where:
    {
      time_id: dadosPontuacaoTimeRodada.time_id,
      nrRodada: dadosPontuacaoTimeRodada.nrRodada
    }
  })
    .then(psq1 => {
      if (psq1 === null) {

        const pontuacaoTimeRodada = new PontuacaoTimeRodada({ ...dadosPontuacaoTimeRodada });
        pontuacaoTimeRodada.save();
        return true;

      } else {
        
        return PontuacaoTimeRodada.update(

          {
            pontuacao: dadosPontuacaoTimeRodada.pontuacao
          },
          {
            where: {
              time_id: dadosPontuacaoTimeRodada.time_id,
              nrRodada: dadosPontuacaoTimeRodada.nrRodada
            }
          }

        ).then(function (updatedRecord) {
          if (updatedRecord) {
            return true;
          }
          else {
            return false;
          }
        });
      }
    });
};



module.exports = {
  cadastrarPontuacaoTimeRodada
};
