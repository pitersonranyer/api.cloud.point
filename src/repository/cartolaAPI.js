var unirest = require("unirest");
const sequelize = require('../database/database');

const BASE_URL = 'https://api.cartolafc.globo.com';

const URL_LOGIN = 'https://login.globo.com/api/authentication'

const postLoginCartola = (login) => {

  var url = URL_LOGIN;

  return unirest.post(url)
    .header(
      "Content-Type", 'application/json'
    )
    .send({
      "payload": {
        "email": login.login,
        "password": login.senha,
        "serviceId": 438 //Provavelmente o ID que identifica o Cartola?!
      }
    })
    .then(data => {
      if (data.statusCode !== 200) {
        return false
      } else {
        return data.body
      }
    });
}

const getTimeUsuarioLogado = (glbId) => {

  path = `/auth/time/info`;
  var url = `${BASE_URL}${path}`;

  return unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )
    .header("X-GLB-Token", glbId)

    .then(data => {
      if (data === null) {
        return false;
      } else {
        return data.body;
      }
    });
}

const getTimesCartola = (time) => {

  path = `/times?q=${time}`;
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
        return data.body;
      }
    });
}

const getTimeCartola = (idTime) => {

  path = `/time/id/${idTime}`;
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
        return data.body;
      }
    });
}


const getTimeInfoCartolaById = (idTime) => {

  path = `/time/id/${idTime}`;
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
        return data.body.time;
      }
    });
}

const getAtletasPontuados = () => {

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
        return arrayAtletasPontuados;
      }
    });
}

const getMercadoStatus = async () => {

  path = `/mercado/status`;
  var url = `${BASE_URL}${path}`;

  mercado = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )

  if (mercado === null) {
    return false;
  } else {
    return mercado.body;
  }
}

const getBancodeReservas = (time_id, nrRodada) => {

  path = `/time/substituicoes/${time_id}/${nrRodada}`;
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
        return data.body;
      }
    });
}


const getPartidas = async (nrRodada) => {

  path = `/partidas/${nrRodada}`;
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
      // partidasArray[i].partida_data.toDate('dd/mm/yyyy hh:ii:ss')
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



        if (Number(partidasArray[i].clube_casa_id) === Number(clubesArray[x].id)) {
          partidasArray[i].nomeMandante = clubesArray[x].nome;
          partidasArray[i].abreviacaoMandante = clubesArray[x].abreviacao;
          partidasArray[i].escudosMandante = escudoTime[x].link //clubesArray[x].escudos;
          partidasArray[i].nome_fantasiaMandante = clubesArray[x].nome_fantasia;
        }
        if (Number(partidasArray[i].clube_visitante_id) === Number(clubesArray[x].id)) {
          partidasArray[i].nomeVisitante = clubesArray[x].nome;
          partidasArray[i].abreviacaoVisitante = clubesArray[x].abreviacao;
          partidasArray[i].escudosVisitante = escudoTime[x].link //clubesArray[x].escudos;
          partidasArray[i].nome_fantasiaVisitante = clubesArray[x].nome_fantasia;

        }
      }
    }
    return partidasArray;
  }
}



const getParciaisAtletasMercadoAberto = async (time_id) => {

  path = `/time/id/${time_id}`;
  //path = `/time/id/${time_id}/12`;
  var url = `${BASE_URL}${path}`;

  escudoTime = [];
  scoutJogador = [];
  clubesArray = [];
  atletasArray = [];
  posicoesArray = [];

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


    let idx = 0

    Object.keys(resultJson.body.atletas).forEach(atleta_id => {

      const atleta = {
        atleta_id: resultJson.body.atletas[atleta_id].atleta_id,
        apelido: resultJson.body.atletas[atleta_id].apelido,
        pontuacao: resultJson.body.atletas[atleta_id].pontos_num,
        variacao_num: resultJson.body.atletas[atleta_id].variacao_num,
        foto: resultJson.body.atletas[atleta_id].foto,
        posicao_id: resultJson.body.atletas[atleta_id].posicao_id,
        clube_id: resultJson.body.atletas[atleta_id].clube_id,
        entrou_em_campo: resultJson.body.atletas[atleta_id].entrou_em_campo
      };

      atletasArray.push(atleta);
      atletasArray[atleta_id].scout = [];
      scoutJogadorTempPositivo = [];
      scoutJogadorTempNegativo = [];
      scoutJogadorTemp = [];

      Object.keys(resultJson.body.atletas[atleta_id].scout).forEach(id => {

        if (resultJson.body.atletas[atleta_id].scout[id] === 1) {
          resultJson.body.atletas[atleta_id].scout[id] = '';
        }


        const objScout = {
          scoutId: id,
          result: resultJson.body.atletas[atleta_id].scout[id] + id,
          atleta: atletasArray[atleta_id].atleta_id

        };

        scoutJogador.push(objScout);

        if (scoutJogador[idx].atleta === atletasArray[atleta_id].atleta_id) {
          scoutJogadorTemp.push(scoutJogador[idx].result);

          if (scoutJogador[idx].scoutId === 'G'
            || scoutJogador[idx].scoutId === 'A'
            || scoutJogador[idx].scoutId === 'FT'
            || scoutJogador[idx].scoutId === 'FD'
            || scoutJogador[idx].scoutId === 'FF'
            || scoutJogador[idx].scoutId === 'FS'
            || scoutJogador[idx].scoutId === 'PS'
            || scoutJogador[idx].scoutId === 'DP'
            || scoutJogador[idx].scoutId === 'SG'
            || scoutJogador[idx].scoutId === 'DE'
            || scoutJogador[idx].scoutId === 'DS') {
            scoutJogadorTempPositivo.push(scoutJogador[idx].result);
          } else {
            scoutJogadorTempNegativo.push(scoutJogador[idx].result);
          }

        }

        idx = idx + 1

      });


      atletasArray[atleta_id].scoutPositivo = scoutJogadorTempPositivo.toString();
      atletasArray[atleta_id].scoutNegativo = scoutJogadorTempNegativo.toString();
      atletasArray[atleta_id].scout = scoutJogadorTemp.toString();

    });


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


    // Juntar array de clubes com array de atletas
    for (let i = 0; i < atletasArray.length; i++) {

      atletasArray[i].foto = atletasArray[i].foto.replace('FORMATO', '140x140');

      if (resultJson.body.capitao_id === atletasArray[i].atleta_id) {
        atletasArray[i].capitao = true;
        atletasArray[i].pontuacao = atletasArray[i].pontuacao * 2;

      } else {
        atletasArray[i].capitao = false;
      }


      //clubes
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


        if (Number(atletasArray[i].clube_id) === Number(clubesArray[x].id)) {
          atletasArray[i].nome = clubesArray[x].nome;
          atletasArray[i].abreviacao = clubesArray[x].abreviacao;
          atletasArray[i].escudo = escudoTime[x].link //clubesArray[x].escudos;
          atletasArray[i].nome_fantasia = clubesArray[x].nome_fantasia;
        }

      }


      // recuperar posição atleta
      var ind = 0;
      Object.keys(resultJson.body.posicoes).forEach((id) => {
        const pos = {
          id: id,
          nome: resultJson.body.posicoes[id].nome,
          abreviacao: resultJson.body.posicoes[id].abreviacao,
        };
        posicoesArray.push(pos);

        if (Number(atletasArray[i].posicao_id) === Number(posicoesArray[ind].id)) {
          atletasArray[i].nomePosicao = posicoesArray[ind].nome;
          atletasArray[i].abreviacaoPosicao = posicoesArray[ind].abreviacao;
        }


        ind++;

      });


    }


    atletasArray.sort((a, b) => a['posicao_id'] - b['posicao_id']);


    return atletasArray;
  }
}


const getParciaisAtletasReservasMercadoAberto = async (time_id) => {

  path = `/time/id/${time_id}`;
  // path = `/time/id/${time_id}/12`;
  var url = `${BASE_URL}${path}`;

  escudoTime = [];
  scoutJogador = [];
  clubesArray = [];
  atletasArray = [];
  posicoesArray = [];



  // consultarTimeCartola
  resultJson = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )

    if (resultJson.body.reservas != undefined) {

    let idx = 0
    Object.keys(resultJson.body.reservas).forEach(atleta_id => {

      const atleta = {

        atleta_id: resultJson.body.reservas[atleta_id].atleta_id,
        apelido: resultJson.body.reservas[atleta_id].apelido,
        pontuacao: resultJson.body.reservas[atleta_id].pontos_num,
        variacao_num: resultJson.body.reservas[atleta_id].variacao_num,
        foto: resultJson.body.reservas[atleta_id].foto,
        posicao_id: resultJson.body.reservas[atleta_id].posicao_id,
        clube_id: resultJson.body.reservas[atleta_id].clube_id,
      };

      atletasArray.push(atleta);
      atletasArray[atleta_id].scout = [];
      scoutJogadorTemp = [];
      scoutJogadorTempPositivo = [];
      scoutJogadorTempNegativo = [];


      Object.keys(resultJson.body.reservas[atleta_id].scout).forEach(id => {

        if (resultJson.body.reservas[atleta_id].scout[id] === 1) {
          resultJson.body.reservas[atleta_id].scout[id] = '';
        }


        const objScout = {
          scoutId: id,
          result: resultJson.body.reservas[atleta_id].scout[id] + id,
          atleta: atletasArray[atleta_id].atleta_id
        };

        scoutJogador.push(objScout);

        if (scoutJogador[idx].atleta === atletasArray[atleta_id].atleta_id) {
          scoutJogadorTemp.push(scoutJogador[idx].result);
          if (scoutJogador[idx].scoutId === 'G'
            || scoutJogador[idx].scoutId === 'A'
            || scoutJogador[idx].scoutId === 'FT'
            || scoutJogador[idx].scoutId === 'FD'
            || scoutJogador[idx].scoutId === 'FF'
            || scoutJogador[idx].scoutId === 'FS'
            || scoutJogador[idx].scoutId === 'PS'
            || scoutJogador[idx].scoutId === 'DP'
            || scoutJogador[idx].scoutId === 'SG'
            || scoutJogador[idx].scoutId === 'DE'
            || scoutJogador[idx].scoutId === 'DS') {
            scoutJogadorTempPositivo.push(scoutJogador[idx].result);
          } else {
            scoutJogadorTempNegativo.push(scoutJogador[idx].result);
          }
        }

        idx = idx + 1

      });

      atletasArray[atleta_id].scoutPositivo = scoutJogadorTempPositivo.toString();
      atletasArray[atleta_id].scoutNegativo = scoutJogadorTempNegativo.toString();
      atletasArray[atleta_id].scout = scoutJogadorTemp.toString();

    });


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


    // Juntar array de clubes com array de atletas
    for (let i = 0; i < atletasArray.length; i++) {

      atletasArray[i].foto = atletasArray[i].foto.replace('FORMATO', '140x140');


      //clubes
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


        if (Number(atletasArray[i].clube_id) === Number(clubesArray[x].id)) {
          atletasArray[i].nome = clubesArray[x].nome;
          atletasArray[i].abreviacao = clubesArray[x].abreviacao;
          atletasArray[i].escudo = escudoTime[x].link //clubesArray[x].escudos;
          atletasArray[i].nome_fantasia = clubesArray[x].nome_fantasia;
        }

      }


      // recuperar posição atleta
      var ind = 0;
      Object.keys(resultJson.body.posicoes).forEach((id) => {
        const pos = {
          id: id,
          nome: resultJson.body.posicoes[id].nome,
          abreviacao: resultJson.body.posicoes[id].abreviacao,
        };
        posicoesArray.push(pos);

        if (Number(atletasArray[i].posicao_id) === Number(posicoesArray[ind].id)) {
          atletasArray[i].nomePosicao = posicoesArray[ind].nome;
          atletasArray[i].abreviacaoPosicao = posicoesArray[ind].abreviacao;
        }


        ind++;

      });


    }

    atletasArray.sort((a, b) => a['posicao_id'] - b['posicao_id']);


    return atletasArray;
  }else{
    return [];
  }
}



const getParciaisAtletasMercadoFechado = async (time_id) => {

  path = `/time/id/${time_id}`;
  //path = `/time/id/${time_id}/12`;
  var url = `${BASE_URL}${path}`;

  escudoTime = [];
  scoutJogador = [];
  clubesArray = [];
  atletasArray = [];
  posicoesArray = [];

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

    let rodadaAtual = resultJson.body.time.rodada_time_id;


    Object.keys(resultJson.body.atletas).forEach(atleta_id => {

      const atleta = {
        atleta_id: resultJson.body.atletas[atleta_id].atleta_id,
        apelido: resultJson.body.atletas[atleta_id].apelido,
        pontuacao: resultJson.body.atletas[atleta_id].pontos_num,
        variacao_num: resultJson.body.atletas[atleta_id].variacao_num,
        foto: resultJson.body.atletas[atleta_id].foto,
        posicao_id: resultJson.body.atletas[atleta_id].posicao_id,
        clube_id: resultJson.body.atletas[atleta_id].clube_id,
        entrou_em_campo: resultJson.body.atletas[atleta_id].entrou_em_campo
      };


      atletasArray.push(atleta);

    });

    for (let i = 0; i < atletasArray.length; i++) {

      await recuperarDadosAtletas(atletasArray[i].atleta_id, rodadaAtual, i);

    }

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


    // Juntar array de clubes com array de atletas
    for (let i = 0; i < atletasArray.length; i++) {

      if (resultJson.body.capitao_id === atletasArray[i].atleta_id) {
        atletasArray[i].capitao = true;
        atletasArray[i].pontuacao = atletasArray[i].pontuacao * 2;

      } else {
        atletasArray[i].capitao = false;
      }


      //clubes
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


        if (Number(atletasArray[i].clube_id) === Number(clubesArray[x].id)) {
          atletasArray[i].nome = clubesArray[x].nome;
          atletasArray[i].abreviacao = clubesArray[x].abreviacao;
          atletasArray[i].escudo = escudoTime[x].link //clubesArray[x].escudos;
          atletasArray[i].nome_fantasia = clubesArray[x].nome_fantasia;
        }

      }


      // recuperar posição atleta
      var ind = 0;
      Object.keys(resultJson.body.posicoes).forEach((id) => {
        const pos = {
          id: id,
          nome: resultJson.body.posicoes[id].nome,
          abreviacao: resultJson.body.posicoes[id].abreviacao,
        };
        posicoesArray.push(pos);

        if (Number(atletasArray[i].posicao_id) === Number(posicoesArray[ind].id)) {
          atletasArray[i].nomePosicao = posicoesArray[ind].nome;
          atletasArray[i].abreviacaoPosicao = posicoesArray[ind].abreviacao;
        }


        ind++;

      });


    }


    atletasArray.sort((a, b) => a['posicao_id'] - b['posicao_id']);


    return atletasArray;
  }
}

const getParciaisAtletasReservasMercadoFechado = async (time_id) => {

  path = `/time/id/${time_id}`;
  //path = `/time/id/${time_id}/12`;
  var url = `${BASE_URL}${path}`;

  escudoTime = [];
  scoutJogador = [];
  clubesArray = [];
  atletasArray = [];
  posicoesArray = [];

  // consultarTimeCartola
  resultJson = await unirest.get(url)
    .header(
      "User-Agent", "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.71 Safari/537.36",
      "Accept", "application/json, text/plain, */*",
      "Referer", "https://cartolafc.globo.com/",
      "Origin", "https://cartolafc.globo.com/",
      "Accept-Language", "pt-BR,pt;q=0.8,en-US;q=0.6,en;q=0.4,es;q=0.2"
    )

  if (resultJson.body.reservas != undefined) {

    let rodadaAtual = resultJson.body.time.rodada_time_id;


    Object.keys(resultJson.body.reservas).forEach(atleta_id => {

      const atleta = {
        atleta_id: resultJson.body.reservas[atleta_id].atleta_id,
        apelido: resultJson.body.reservas[atleta_id].apelido,
        pontuacao: resultJson.body.reservas[atleta_id].pontos_num,
        variacao_num: resultJson.body.reservas[atleta_id].variacao_num,
        foto: resultJson.body.reservas[atleta_id].foto,
        posicao_id: resultJson.body.reservas[atleta_id].posicao_id,
        clube_id: resultJson.body.reservas[atleta_id].clube_id,
      };

      atletasArray.push(atleta);

    });

    for (let i = 0; i < atletasArray.length; i++) {

      await recuperarDadosAtletas(atletasArray[i].atleta_id, rodadaAtual, i);

    }

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


    // Juntar array de clubes com array de atletas
    for (let i = 0; i < atletasArray.length; i++) {

      if (resultJson.body.capitao_id === atletasArray[i].atleta_id) {
        atletasArray[i].capitao = true;
        atletasArray[i].pontuacao = atletasArray[i].pontuacao * 2;

      } else {
        atletasArray[i].capitao = false;
      }


      //clubes
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


        if (Number(atletasArray[i].clube_id) === Number(clubesArray[x].id)) {
          atletasArray[i].nome = clubesArray[x].nome;
          atletasArray[i].abreviacao = clubesArray[x].abreviacao;
          atletasArray[i].escudo = escudoTime[x].link //clubesArray[x].escudos;
          atletasArray[i].nome_fantasia = clubesArray[x].nome_fantasia;
        }

      }


      // recuperar posição atleta
      var ind = 0;
      Object.keys(resultJson.body.posicoes).forEach((id) => {
        const pos = {
          id: id,
          nome: resultJson.body.posicoes[id].nome,
          abreviacao: resultJson.body.posicoes[id].abreviacao,
        };
        posicoesArray.push(pos);

        if (Number(atletasArray[i].posicao_id) === Number(posicoesArray[ind].id)) {
          atletasArray[i].nomePosicao = posicoesArray[ind].nome;
          atletasArray[i].abreviacaoPosicao = posicoesArray[ind].abreviacao;
        }


        ind++;

      });


    }


    atletasArray.sort((a, b) => a['posicao_id'] - b['posicao_id']);


    return atletasArray;
  }else {
    return [];
  }
}


const recuperarDadosAtletas = async (atleta_id, nrRodada, ind) => {

  atletas = await sequelize.query("SELECT `atletas`.`nrRodada` " +
    " , `atletas`.`atleta_id` " +
    " , `atletas`.`apelido` " +
    " , `atletas`.`foto` " +
    " , `atletas`.`pontuacao` " +
    " , `atletas`.`posicao_id` " +
    " , `atletas`.`clube_id` " +
    " , `atletas`.`entrou_em_campo` " +
    " , `atletas`.`scoutPositivo` " +
    " , `atletas`.`scoutNegativo` " +
    "      FROM `atletas` " +
    "      WHERE `atletas`.`atleta_id` " + `= "${atleta_id}" ` +
    "      AND `atletas`.`nrRodada` " + `= "${nrRodada}" `
    , {
      type: sequelize.QueryTypes.SELECT
    });

  if (atletas.length > 0) {

    atletasArray[ind].apelido = atletas[0].apelido;
    atletasArray[ind].foto = atletas[0].foto;
    atletasArray[ind].posicao_id = atletas[0].posicao_id;
    atletasArray[ind].clube_id = atletas[0].clube_id;
    atletasArray[ind].scoutPositivo = atletas[0].scoutPositivo;
    atletasArray[ind].scoutNegativo = atletas[0].scoutNegativo;
    atletasArray[ind].pontuacao = atletas[0].pontuacao;
    atletasArray[ind].entrou_em_campo = atletas[0].entrou_em_campo;

  }
}


module.exports = {
  getTimesCartola,
  getTimeCartola,
  getAtletasPontuados,
  postLoginCartola,
  getTimeUsuarioLogado,
  getMercadoStatus,
  getTimeInfoCartolaById,
  getBancodeReservas,
  getPartidas,
  getParciaisAtletasMercadoAberto,
  getParciaisAtletasReservasMercadoAberto,
  getParciaisAtletasMercadoFechado,
  getParciaisAtletasReservasMercadoFechado
};