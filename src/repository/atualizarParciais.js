var unirest = require("unirest");
var fs = require("fs");
const TimeBilheteCompeticaoCartola = require('../model/timeBilheteCompeticaoCartola');
const Scout = require('../model/scout');
const Atletas = require('../model/atletas');

const sequelize = require('../database/database');

const BASE_URL = 'https://api.cartolafc.globo.com';

var rodada_atualWork = 0;

const putAtualizarParciais = async (nrSequencialRodadaCartola, rodada_atual) => {

  rodada_atualWork = rodada_atual;
  partidas = [];

  timeBilhete = await sequelize.query("SELECT `bilheteCompeticaoCartola`.`idBilhete` " +
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

    , {
      type: sequelize.QueryTypes.SELECT
    });

  if (timeBilhete.length > 0) {

    /* Recuperar lista de atletas pontuados */
    const pontuados = await recuperarAtletasPontuados();

    /* apenas testes em desenv 
       const pontuados = await recuperarAtletasPontuadosTeste();
    */

    /* Recuperar resultados e situação de jogos no momento */
    partidas = await recuperarSituacaoPartidas();

    /* Deleta atletas para gravar novamente */
    await atualizarAtletasPontuados(pontuados);

    /* Deleta scout para gravar novamente */
    await atualizarScoutJogadores(pontuados);

    /* Atualizar tabela atletas  */
    await atualizarTabelaAtletas(pontuados);


    for (let i = 0; i < timeBilhete.length; i++) {

      const atletasTime = await recuperJogadoresPorTime(timeBilhete[i].time_id);

      tratarPontuacaoAtletas(atletasTime, timeBilhete[i].time_id, timeBilhete[i].idBilhete, timeBilhete[i].pontosCampeonato, pontuados)

    }

    return true

  } else {
    return false
  }



}


const atualizarScoutJogadores = async (pontuados) => {


  Scout.destroy({
    where: {
      nrRodada: rodada_atualWork
    }
  });

  var scoutJogador = [];
  var idx = 0;

  for (let ix = 0; ix < pontuados.length; ix++) {

    if (pontuados[ix].scout != null) {

      Object.keys(pontuados[ix].scout).forEach(id => {

        const objScout = {
          result: pontuados[ix].scout[id] + id,
          atleta_id: pontuados[ix].atleta_id,
          apelido: pontuados[ix].apelido,
          sigla_id: id,
          qtde: pontuados[ix].scout[id],
          tipo: 'X',
          nrRodada: rodada_atualWork
        };

        scoutJogador.push(objScout);


        if (scoutJogador[idx].sigla_id === 'G'
          || scoutJogador[idx].sigla_id === 'A'
          || scoutJogador[idx].sigla_id === 'FT'
          || scoutJogador[idx].sigla_id === 'FD'
          || scoutJogador[idx].sigla_id === 'FF'
          || scoutJogador[idx].sigla_id === 'FS'
          || scoutJogador[idx].sigla_id === 'PS'
          || scoutJogador[idx].sigla_id === 'DP'
          || scoutJogador[idx].sigla_id === 'SG'
          || scoutJogador[idx].sigla_id === 'DE'
          || scoutJogador[idx].sigla_id === 'DS') {
          scoutJogador[idx].tipo = 'P';
        } else {
          scoutJogador[idx].tipo = 'N';
        }

        /* Gravar tabela de scout  */
        gravarScoutJogador(scoutJogador[idx]);

        idx = idx + 1

      });

    }


  }

}


const atualizarAtletasPontuados = async (pontuados) => {

  Atletas.destroy({
    where: {
      nrRodada: rodada_atualWork
    }
  });

  for (let ix = 0; ix < pontuados.length; ix++) {
    // Gravar tabela de atletas 
    gravarAtletas(pontuados[ix]);
  }
}

const gravarAtletas = async (objAtletas) => {
  objAtletas.nrRodada = rodada_atualWork;
  objAtletas.scoutPositivo = '';
  objAtletas.scoutNegativo = '';
  objAtletas.qtdeGols = 0;
  objAtletas.qtdeAssistencia = 0;
  objAtletas.qtdeCartaoAmarelo = 0;
  objAtletas.qtdeCartaoVermelho = 0;
  objAtletas.qtdeGolContra = 0;
  objAtletas.saldoGol = false;

  //Gravar atletas
  const atletas = new Atletas({ ...objAtletas });
  atletas.save();

}


const recuperarSituacaoPartidas = async () => {

  path = `/partidas/${rodada_atualWork}`;
  var url = `${BASE_URL}${path}`;
  clubesArray = [];
  partidasArray = [];
  escudoTime = [];

  // consultarTimeCartola
  resultJson = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )

  if (resultJson.body) {

    partidasArray = resultJson.body.partidas;

    Object.keys(resultJson.body.clubes).forEach(id => {
      const clubes = {
        id: id,
        nome: resultJson.body.clubes[id].nome,
        abreviacao: resultJson.body.clubes[id].abreviacao,
        escudos: resultJson.body.clubes[id].escudos,
        nome_fantasia: resultJson.body.clubes[id].nome_fantasia
      };
      clubesArray.push(clubes);

    });

    // Juntar array de times com array de partidas
    for (let i = 0; i < partidasArray.length; i++) {
      partidasArray[i].horaPartida = partidasArray[i].partida_data.substring(11, 16);
      var partidaMM = partidasArray[i].partida_data.substring(5, 7);
      var partidaDD = partidasArray[i].partida_data.substring(8, 10);
      partidasArray[i].dataPartida = partidaDD + '/' + partidaMM;

      for (let x = 0; x < clubesArray.length; x++) {

        // Recuperar link do escudo 30x30
        Object.keys(clubesArray[x].escudos).forEach(id => {
          const brasao = {
            id: id,
            link: clubesArray[x].escudos[id]
          };
          if (id === '30x30') {
            escudoTime.push(brasao);
          }
        });

        /* Tratar status da partida */
        if (partidasArray[i].status_transmissao_tr === 'CRIADA') {
          partidasArray[i].status_transmissao_tr = 'À iniciar';
        } else {
          if (partidasArray[i].status_transmissao_tr === 'ENCERRADA') {
            partidasArray[i].status_transmissao_tr = 'Encerrada'
          } else {
            if (partidasArray[i].status_transmissao_tr === 'EM_ANDAMENTO') {
              if (partidasArray[i].periodo_tr === 'INTERVALO') {
                partidasArray[i].status_transmissao_tr = 'Intervalo';
              } else {
                if (partidasArray[i].periodo_tr === 'PRE_JOGO') {
                  partidasArray[i].status_transmissao_tr = 'À iniciar';
                } else {
                  partidasArray[i].status_transmissao_tr = 'Em andamento';
                }
              }
            }
          }
        }


        if (Number(partidasArray[i].clube_casa_id) === Number(clubesArray[x].id)) {
          partidasArray[i].nomeMandante = clubesArray[x].nome;
          partidasArray[i].abreviacaoMandante = clubesArray[x].abreviacao;
          partidasArray[i].escudosMandante = escudoTime[x].link /* clubesArray[x].escudos */;
          partidasArray[i].nome_fantasiaMandante = clubesArray[x].nome_fantasia;
        }
        if (Number(partidasArray[i].clube_visitante_id) === Number(clubesArray[x].id)) {
          partidasArray[i].nomeVisitante = clubesArray[x].nome;
          partidasArray[i].abreviacaoVisitante = clubesArray[x].abreviacao;
          partidasArray[i].escudosVisitante = escudoTime[x].link /* clubesArray[x].escudos */;
          partidasArray[i].nome_fantasiaVisitante = clubesArray[x].nome_fantasia;

        }
      }
    }
    return partidasArray;
  }

}


const recuperarAtletasPontuados = async () => {

  path = `/atletas/pontuados`;
  var url = `${BASE_URL}${path}`;
  // var arrayAtletasPontuados = [];

  arrayAtletasPontuados = [];
  scoutJogador = [];

  dadosAtletas = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )



  if (dadosAtletas.body) {

    Object.keys(dadosAtletas.body.atletas).forEach(atleta_id => {
      const atleta = {
        atleta_id: atleta_id,
        apelido: dadosAtletas.body.atletas[atleta_id].apelido,
        pontuacao: dadosAtletas.body.atletas[atleta_id].pontuacao,
        foto: dadosAtletas.body.atletas[atleta_id].foto,
        posicao_id: dadosAtletas.body.atletas[atleta_id].posicao_id,
        clube_id: dadosAtletas.body.atletas[atleta_id].clube_id,
        entrou_em_campo: dadosAtletas.body.atletas[atleta_id].entrou_em_campo,
        scout: dadosAtletas.body.atletas[atleta_id].scout,

      };

      atleta.foto = atleta.foto.replace('FORMATO', '140x140');


      arrayAtletasPontuados.push(atleta);


    });

    return arrayAtletasPontuados;

  }

}

const recuperJogadoresPorTime = async (timeID) => {

  path = `/time/id/${timeID}`;
  var url = `${BASE_URL}${path}`;

  dadosTimes = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )

  return dadosTimes.body;


}


const recuperarAtletasPontuadosTeste = async () => {

  arrayAtletasPontuados = [];
  scoutJogador = [];

  data = fs.readFileSync('./src/model/pontuados.json', 'utf8');

  const dadosAtletas = JSON.parse(data);



  if (dadosAtletas) {

    Object.keys(dadosAtletas.atletas).forEach(atleta_id => {
      const atleta = {
        atleta_id: atleta_id,
        apelido: dadosAtletas.atletas[atleta_id].apelido,
        pontuacao: dadosAtletas.atletas[atleta_id].pontuacao,
        foto: dadosAtletas.atletas[atleta_id].foto,
        posicao_id: dadosAtletas.atletas[atleta_id].posicao_id,
        clube_id: dadosAtletas.atletas[atleta_id].clube_id,
        entrou_em_campo: dadosAtletas.atletas[atleta_id].entrou_em_campo,
        scout: dadosAtletas.atletas[atleta_id].scout,

      };

      atleta.foto = atleta.foto.replace('FORMATO', '140x140');


      arrayAtletasPontuados.push(atleta);


    });

    return arrayAtletasPontuados;

  }

}



const recuperBancoReservas = async (timeID) => {

  path = `/time/substituicoes/${timeID}/${rodada_atualWork}`;
  var url = `${BASE_URL}${path}`;

  substituicao = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )

  if (substituicao) {
    return substituicao.body;
  }

}





const tratarPontuacaoAtletas = async (atletasTime, time_id, idBilhete, pontosCampeonato, pontuados) => {

  arrayAtletasPontuados = pontuados;
  var capitao_id = atletasTime.capitao_id;
  var totPontos = 0;
  var pontuacaoParcial = 0;
  var pontuacaoParcialReserva = 0;
  var qtdEntrouEmCampo = 0

  if (atletasTime.pontos_campeonato === null) {
    pontosCampeonato = 0
  } else {
    pontosCampeonato = atletasTime.pontos_campeonato;
  }



  for (let x = 0; x < atletasTime.atletas.length; x++) {
    for (let z = 0; z < arrayAtletasPontuados.length; z++) {
      if (Number(atletasTime.atletas[x].atleta_id) === Number(arrayAtletasPontuados[z].atleta_id)) {
        // Dobrar pontuação do capitão
        if (Number(capitao_id) === Number(atletasTime.atletas[x].atleta_id)) {
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


  const substituicao = await recuperBancoReservas(time_id);

  if (substituicao) {

    let arraySubstituicao = [] = substituicao;

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


  if (qtdEntrouEmCampo > 12) {
    qtdEntrouEmCampo = 12;
  }
  totPontos = totPontos + pontuacaoParcialReserva
  putPontosTimeBilhete(idBilhete, time_id, totPontos, qtdEntrouEmCampo, pontosCampeonato);

}

const putPontosTimeBilhete = async (idBilhete, time_id, pontuacaoParcial, qtJogadoresPontuados, pontuacaoTotalCompeticao) => {


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



const gravarScoutJogador = async (objScout) => {

  //Gravar scout
  const scout = new Scout({ ...objScout });
  scout.save();

}


const atualizarTabelaAtletas = async (pontuados) => {



  for (let a = 0; a < pontuados.length; a++) {

    const scoutDetalhe = {
      qtdeGols: 0,
      qtdeAssistencia: 0,
      qtdeCartaoAmarelo: 0,
      qtdeCartaoVermelho: 0,
      qtdeGolContra: 0,
      saldoGol: false
    }

    const partidaAtleta = {
      clube_casa_id: null,
      placar_oficial_mandante: null,
      abreviacaoMandante: null,
      clube_visitante_id: null,
      placar_oficial_visitante: null,
      abreviacaoVisitante: null,
      status_transmissao_tr: null
    }

    scoutJogadorTempPositivo = [];
    scoutJogadorTempNegativo = [];


    scoutAtleta = await sequelize.query(" select `scout`.`sigla_id`, `scout`.`qtde`, concat(`scout`.`qtde`, `scout`.`sigla_id`) as `result`  " +
      "      FROM `scout` " +
      "      WHERE `scout`.`atleta_id` " + `= "${pontuados[a].atleta_id}" ` +
      "      AND `scout`.`nrRodada` " + `= "${rodada_atualWork}" `
      , {
        type: sequelize.QueryTypes.SELECT
      });


    if (scoutAtleta.length > 0) {

      for (i = 0; i < scoutAtleta.length; i++) {

        if (scoutAtleta[i].sigla_id === 'G'
          || scoutAtleta[i].sigla_id === 'A'
          || scoutAtleta[i].sigla_id === 'FT'
          || scoutAtleta[i].sigla_id === 'FD'
          || scoutAtleta[i].sigla_id === 'FF'
          || scoutAtleta[i].sigla_id === 'FS'
          || scoutAtleta[i].sigla_id === 'PS'
          || scoutAtleta[i].sigla_id === 'DP'
          || scoutAtleta[i].sigla_id === 'SG'
          || scoutAtleta[i].sigla_id === 'DE'
          || scoutAtleta[i].sigla_id === 'DS') {

          scoutJogadorTempPositivo.push(scoutAtleta[i].result);

          if (scoutAtleta[i].sigla_id === 'G') {
            scoutDetalhe.qtdeGols = scoutDetalhe.qtdeGols + scoutAtleta[i].qtde;
          }
          if (scoutAtleta[i].sigla_id === 'A') {
            scoutDetalhe.qtdeAssistencia = scoutDetalhe.qtdeAssistencia + scoutAtleta[i].qtde;
          }
          if (scoutAtleta[i].sigla_id === 'SG') {
            scoutDetalhe.saldoGol = true;
          }

        } else {
          scoutJogadorTempNegativo.push(scoutAtleta[i].result);
          if (scoutAtleta[i].sigla_id === 'CA') {
            scoutDetalhe.qtdeCartaoAmarelo = scoutDetalhe.qtdeCartaoAmarelo + scoutAtleta[i].qtde;
          }
          if (scoutAtleta[i].sigla_id === 'CV') {
            scoutDetalhe.qtdeCartaoVermelho = scoutDetalhe.qtdeCartaoVermelho + scoutAtleta[i].qtde;
          }
          if (scoutAtleta[i].sigla_id === 'GC') {
            scoutDetalhe.qtdeGolContra = scoutDetalhe.qtdeGolContra + scoutAtleta[i].qtde;
          }

        }

      }

      var scoutPos = scoutJogadorTempPositivo.toString();
      var scoutNeg = scoutJogadorTempNegativo.toString();


      Atletas.update(

        {
          scoutPositivo: scoutPos,
          scoutNegativo: scoutNeg,
          qtdeGols: scoutDetalhe.qtdeGols,
          qtdeAssistencia: scoutDetalhe.qtdeAssistencia,
          qtdeCartaoAmarelo: scoutDetalhe.qtdeCartaoAmarelo,
          qtdeCartaoVermelho: scoutDetalhe.qtdeCartaoVermelho,
          qtdeGolContra: scoutDetalhe.qtdeGolContra,
          saldoGol: scoutDetalhe.saldoGol,
        },
        {
          where: {
            nrRodada: rodada_atualWork,
            atleta_id: pontuados[a].atleta_id
          }
        }

      )

    }


    /* Recuprar jogos por atleta  */
    for (ix = 0; ix < partidas.length; ix++) {
      if (partidas[ix].clube_casa_id === pontuados[a].clube_id || partidas[ix].clube_visitante_id === pontuados[a].clube_id) {
        /* Mandante */
        partidaAtleta.placar_oficial_mandante = partidas[ix].placar_oficial_mandante;
        partidaAtleta.abreviacaoMandante = partidas[ix].abreviacaoMandante;
        partidaAtleta.clube_casa_id = partidas[ix].clube_casa_id;
        /* Visitante */
        partidaAtleta.placar_oficial_visitante = partidas[ix].placar_oficial_visitante;
        partidaAtleta.abreviacaoVisitante = partidas[ix].abreviacaoVisitante;
        partidaAtleta.clube_visitante_id = partidas[ix].clube_visitante_id;
        /* Situação da partida */
        partidaAtleta.status_transmissao_tr = partidas[ix].status_transmissao_tr
      }
    }

    Atletas.update(
      {
        clube_casa_id: partidaAtleta.clube_casa_id,
        placar_oficial_mandante: partidaAtleta.placar_oficial_mandante,
        abreviacaoMandante: partidaAtleta.abreviacaoMandante,
        clube_visitante_id: partidaAtleta.clube_visitante_id,
        placar_oficial_visitante: partidaAtleta.placar_oficial_visitante,
        abreviacaoVisitante: partidaAtleta.abreviacaoVisitante,
        status_transmissao_tr: partidaAtleta.status_transmissao_tr,
      },
      {
        where: {
          nrRodada: rodada_atualWork,
          atleta_id: pontuados[a].atleta_id
        }
      }
    )
  }
}


const getScoutAtletas = async (atleta_id, nrRodada) => {


  atletas = await sequelize.query("SELECT `atletas`.`nrRodada` " +
    " , `atletas`.`atleta_id` " +
    " , `atletas`.`apelido` " +
    " , `atletas`.`foto` " +
    " , `atletas`.`pontuacao` " +
    " , `atletas`.`posicao_id` " +
    " , `atletas`.`clube_id` " +
    " , `atletas`.`entrou_em_campo` " +
    "      FROM `atletas` " +
    "      WHERE `atletas`.`atleta_id` " + `= "${atleta_id}" ` +
    "      AND `atletas`.`nrRodada` " + `= "${nrRodada}" `
    , {
      type: sequelize.QueryTypes.SELECT
    });



  scoutAtleta = await sequelize.query(" select concat(`scout`.`qtde`, `scout`.`sigla_id`) as `result`  " +
    "      FROM `scout` " +
    "      WHERE `scout`.`atleta_id` " + `= "${atleta_id}" ` +
    "      AND `scout`.`nrRodada` " + `= "${nrRodada}" `
    , {
      type: sequelize.QueryTypes.SELECT
    });

  if (scoutAtleta.length > 0) {

    var scoutAtletaResult = scoutAtleta[0].result;
    for (i = 1; i < scoutAtleta.length; i++) {
      scoutAtleta[i].result = scoutAtletaResult + ',' + scoutAtleta[i].result
      scoutAtletaResult = scoutAtleta[i].result;
    }

    //  return scoutAtletaResult;

  }


  atletas[0].scout = scoutAtletaResult

  return atletas;


};




module.exports = {
  putAtualizarParciais,
  getScoutAtletas
};
