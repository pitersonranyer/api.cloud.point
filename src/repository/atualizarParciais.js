var unirest = require("unirest");
var fs = require("fs");
const TimeBilheteCompeticaoCartola = require('../model/timeBilheteCompeticaoCartola');

const sequelize = require('../database/database');

const BASE_URL = 'https://api.cartolafc.globo.com';



const putParciais = (nrSequencialRodadaCartola) => {

  const arrayAtletasPontuados = [];

  return sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
    " , `bilheteCompeticaoCartola`.`codigoBilhete` " +
    " , `bilheteCompeticaoCartola`.`nomeUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrContatoUsuario` " +
    " , `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " +
    " , `bilheteCompeticaoCartola`.`statusAtualBilhete` " +
    " , `timeBilheteCompeticaoCartola`.`time_id` " +
    " , `timeBilheteCompeticaoCartola`.`assinante` " +
    " , `timeBilheteCompeticaoCartola`.`foto_perfil` " +
    " , `timeBilheteCompeticaoCartola`.`nome` " +
    " , `timeBilheteCompeticaoCartola`.`nome_cartola` " +
    " , `timeBilheteCompeticaoCartola`.`slug` " +
    " , `timeBilheteCompeticaoCartola`.`url_escudo_png` " +
    " , `timeBilheteCompeticaoCartola`.`url_escudo_svg` " +
    " , `timeBilheteCompeticaoCartola`.`facebook_id` " +
    " , `timeBilheteCompeticaoCartola`.`pontuacaoParcial` " +
    " , `timeBilheteCompeticaoCartola`.`pontuacaoTotalCompeticao` " +
    " , `timeBilheteCompeticaoCartola`.`qtJogadoresPontuados` " +
    " , `timeBilheteCompeticaoCartola`.`colocacao` " +
    " , `competicaoCartola`.`nrRodada` " +
    " FROM `bilheteCompeticaoCartola` " +
    " LEFT OUTER JOIN `timeBilheteCompeticaoCartola` " +
    " ON `timeBilheteCompeticaoCartola`.`idBilhete` = `bilheteCompeticaoCartola`.`idBilhete`  " +
    " INNER JOIN `competicaoCartola` " +
    " ON `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` = `competicaoCartola`.`nrSequencialRodadaCartola`  " +
    " WHERE `bilheteCompeticaoCartola`.`nrSequencialRodadaCartola` " + `= "${nrSequencialRodadaCartola}" ` +
    " AND `bilheteCompeticaoCartola`.`statusAtualBilhete` = 'Pago' " +
    " ORDER BY `timeBilheteCompeticaoCartola`.`pontuacaoParcial` DESC "
    , { type: sequelize.QueryTypes.SELECT }).then(function (timeBilhete) {
      if (timeBilhete === null) {
        timeBilhete = 0;
        return false;
      } else {

        // console.log('passo 1');

        path = `/atletas/pontuados`;
        var url = `${BASE_URL}${path}`;


        return unirest.get(url)
          .header(
            "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
            "Accept", "application/json, text/plain, */*",
            "Referer", "https://cartolafc.globo.com/",
            "Origin", "https://cartolafc.globo.com/",
            "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
          )

          .then(data => {
            if (data === null) {
              return false;
            } else {
              const arrayAtletasPontuados = [];
              Object.keys(data.body.atletas).forEach(atleta_id => {
                const atleta = {
                  atleta_id: atleta_id,
                  apelido: data.body.atletas[atleta_id].apelido,
                  pontuacao: data.body.atletas[atleta_id].pontuacao,
                  scout: data.body.atletas[atleta_id].scout,
                  foto: data.body.atletas[atleta_id].foto,
                  posicao_id: data.body.atletas[atleta_id].posicao_id,
                  clube_id: data.body.atletas[atleta_id].clube_id,
                  entrou_em_campo: data.body.atletas[atleta_id].entrou_em_campo
                };
                arrayAtletasPontuados.push(atleta);

              });
              for (let i = 0; i < timeBilhete.length; i++) {

                path = `/time/id/${timeBilhete[i].time_id}`;
                var url = `${BASE_URL}${path}`;

                unirest.get(url)
                  .header(
                    "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
                    "Accept", "application/json, text/plain, */*",
                    "Referer", "https://cartolafc.globo.com/",
                    "Origin", "https://cartolafc.globo.com/",
                    "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
                  )

                  .then(atletasTime => {
                    if (atletasTime === null) {
                      return false;
                    } else {
                  //    console.log('passo 3');
                      var capitao_id = atletasTime.body.capitao_id;
                      var totPontos = 0;
                      var pontuacaoParcial = 0;
                      var pontuacaoParcialReserva = 0;
                      var qtdEntrouEmCampo = 0

                      if (atletasTime.body.pontos_campeonato === null) {
                        timeBilhete[i].pontosCampeonato = 0
                      } else {
                        timeBilhete[i].pontosCampeonato = atletasTime.body.pontos_campeonato;
                      }


                      for (let x = 0; x < atletasTime.body.atletas.length; x++) {
                        for (let z = 0; z < arrayAtletasPontuados.length; z++) {
                          if (Number(atletasTime.body.atletas[x].atleta_id) === Number(arrayAtletasPontuados[z].atleta_id)) {
                            // Dobrar pontuação do capitão
                            if (Number(capitao_id) === Number(atletasTime.body.atletas[x].atleta_id)) {
                              pontuacaoParcial = arrayAtletasPontuados[z].pontuacao * 2;
                            } else {
                              pontuacaoParcial = arrayAtletasPontuados[z].pontuacao;
                            }

                            totPontos += pontuacaoParcial;

                            if (arrayAtletasPontuados[z].entrou_em_campo) {
                              qtdEntrouEmCampo = qtdEntrouEmCampo + 1;
                            }

                          }
                        }
                      }


                      //  console.log(atletasTime.body.reservas);
                      path = `/time/substituicoes/${timeBilhete[i].time_id}/${timeBilhete[i].nrRodada}`;
                      var url = `${BASE_URL}${path}`;

                      return unirest.get(url)
                        .header(
                          "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
                          "Accept", "application/json, text/plain, */*",
                          "Referer", "https://cartolafc.globo.com/",
                          "Origin", "https://cartolafc.globo.com/",
                          "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
                        )

                        .then(substituicao => {
                          if (substituicao === null) {
                            return false;
                          } else {
                            let arraySubstituicao = [] = substituicao.body;

                            for (let b = 0; b < arraySubstituicao.length; b++) {
                              if (arraySubstituicao[b].saiu) {

                                for (let c = 0; c < arraySubstituicao.length; c++) {
                                  if (arraySubstituicao[c].entrou) {

                                    if (Number(arraySubstituicao[b].saiu.posicao_id) === Number(arraySubstituicao[c].entrou.posicao_id)) {
                                    //  console.log('entrou', arraySubstituicao[c].entrou.apelido)

                                      for (let d = 0; d < arrayAtletasPontuados.length; d++) {
                                        if (Number(arraySubstituicao[c].entrou.atleta_id) === Number(arrayAtletasPontuados[d].atleta_id)) {

                                          qtdEntrouEmCampo = qtdEntrouEmCampo + 1;

                                          if (Number(capitao_id) === Number(arraySubstituicao[b].saiu.atleta_id)) {
                                      //      console.log('novo capital =>', arraySubstituicao[c].entrou.apelido);
                                            pontuacaoParcialReserva = pontuacaoParcialReserva + arrayAtletasPontuados[d].pontuacao * 2;
                                        //    console.log(arrayAtletasPontuados[d].pontuacao * 2);
                                            //capitao_id = arraySubstituicao[c].entrou.atleta_id

                                          } else {
                                            pontuacaoParcialReserva = pontuacaoParcialReserva + arrayAtletasPontuados[d].pontuacao;
                                          }
                                        }
                                      }
                                    }
                                  }
                                }

                              }
                            }
                          }
                          if (qtdEntrouEmCampo > 12){
                            qtdEntrouEmCampo = 12 ;
                          }
                          totPontos = totPontos + pontuacaoParcialReserva
                          putPontosTimeBilhete(timeBilhete[i].idBilhete, timeBilhete[i].time_id, totPontos, qtdEntrouEmCampo, timeBilhete[i].pontosCampeonato);
                        });
                    }
                  });
              }
            }
          });
      }

      

    });



}

const putPontosTimeBilhete = (idBilhete, time_id, pontuacaoParcial, qtJogadoresPontuados, pontuacaoTotalCompeticao) => {
  // const idBilhetePut = idBilhete;
  // const time_id = time_id;

  // const pontuacaoParcial = pontuacaoParcial
  // const qtJogadoresPontuados = qtJogadoresPontuados
  // const pontuacaoTotalCompeticao = pontuacaoTotalCompeticao

  pontuacaoParcial.toFixed(2);
  pontuacaoTotalCompeticao.toFixed(2);

  return TimeBilheteCompeticaoCartola.update(

    {
      pontuacaoParcial: pontuacaoParcial,
      qtJogadoresPontuados: qtJogadoresPontuados,
      pontuacaoTotalCompeticao: pontuacaoTotalCompeticao
    },
    {
      where: {
        idBilhete: idBilhete,
        time_id: time_id
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


module.exports = {
  putParciais
};