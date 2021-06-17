var unirest = require("unirest");

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
            if (data.statusCode !== 200 ) {
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

const getMercadoStatus = () => {

    path = `/mercado/status`;
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


module.exports = { getTimesCartola, 
    getTimeCartola, 
    getAtletasPontuados, 
    postLoginCartola, 
    getTimeUsuarioLogado,
    getMercadoStatus,
    getTimeInfoCartolaById,
    getBancodeReservas };