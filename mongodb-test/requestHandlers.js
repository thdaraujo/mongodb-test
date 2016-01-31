var querystring = require("querystring"),
  fs = require("fs"),
  formidable = require("formidable");
var http = require("https");
var models = require("./models");

/* start: exemplo de como retornar html gerado no back-end para o front-end */
function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>' +
    '<head>' +
    '<meta http-equiv="Content-Type" ' +
    'content="text/html; charset=UTF-8" />' +
    '</head>' +
    '<body>' +
    '<form action="/upload" enctype="multipart/form-data" ' +
    'method="post">' +
    '<input type="file" name="upload" multiple="multiple">' +
    '<input type="submit" value="Upload file" />' +
    '</form>' +
    '</body>' +
    '</html>';

  response.writeHead(200, {
    "Content-Type": "text/html"
  });
  response.write(body);
  response.end();
}

/* upload: exemplo de como fazer um upload de arquivo */
function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");

    /* Possible error on Windows systems:
       tried to rename to an already existing file */
    fs.rename(files.upload.path, "/tmp/test.png", function(err) {
      if (err) {
        fs.unlink("/tmp/test.png");
        fs.rename(files.upload.path, "/tmp/test.png");
      }
    });
    response.writeHead(200, {
      "Content-Type": "text/html"
    });
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

/* show: exemplo de como retonar uma imagem na request */
function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {
    "Content-Type": "image/png"
  });
  fs.createReadStream("/tmp/test.png").pipe(response);
}

/* initialPokemon: retorna um json com os pokemons iniciais.
 * utilizamos essa funcao para ilustrar como funciona fazer nossa API :)
 * progredimos muitão desde então né? :DDD
 * Muita gente me perguntou como faço pra retornar dois jsons.
 * Simples: junte os dois dentro de um vetor!
 * No caso, coloquei pkm e digimon dentro do vetor.
 * Não se esqueçam: antes de mandar para o front precisamos sempre dar o
 * stringify nos jsons para transforma-los em strings.
 */
function initialPokemon(response) {
  var pkm = ["Charmander", "Squirtle", "Bulbasaur"];
  var digimon = {
    "nome": "agumon",
    "evolucoes": ["greymon", "wargreymon"]
  };
  response.writeHead(200, {
    "Content-Type": "text/json"
  });

  response.write(JSON.stringify([pkm, digimon]));
  response.end();
}

/* erro_json_invalido: chamar quando o json nao estiver valido
 * @response: variavel response do servidor
 * @formato_valido: json contendo um exemplo valido de dados
 * response: erro para o usuario da API e exemplo de formato valido
 */
function erro_json_invalido(response, formato_valido) {
  var json_invalido = {
    "erro": "json invalido",
    "modelo": formato_valido
  };
  models.end_request(response, json_invalido);
}

/* getURL: faz o get dos dados da API especificada na URL
 * @url: url da API
 * @response: response do server
 * @callback: funcao para ser executada quando acabar de receber os dados da API
 */
function getUrl(url, response, callback) {
  var request = http.get(url, function(res) {
    // os dados vem do servidor em pedacinhos, temos que esperar todos chegarem
    var buffer = "",
      data,
      route;

    // enquanto esta recebendo os pedacinhos, vai adicionhando todos no buffer
    res.on("data", function(chunk) {
      buffer += chunk;
    });

    // quando acabar, ele entra aqui, no "end"
    res.on("end", function(err) {
      // print no console
      console.log(buffer);
      console.log("\n");

      // transforma a string em objeto json
      data = JSON.parse(buffer);
      /* executa o callback, ou seja, a funcao que a gente passou pra ser
        executada no fim */
      callback(data, response);
    });
  });
}

/* returnLeagueData: Finaliza a request para a API do League.
 * essa funcao eh utilizada como callback na funcao acima.
 */
function returnLeagueData(data, response) {
  models.end_request(response, data);
}

/* myLeagueData: retorna os dados de um invocador, recebe invocador via POST */
function myLeagueData(response, request) {
  /* Precisa receber um json no seguinte formato:
   * {"invocador": "nome_de_invocador"}
   */
  if (!request.body.invocador) {
    erro_json_invalido(response, {
      "invocador": "RinaLovelace"
    });
    return;
  }
  var invocador = request.body.invocador;
  /* url: a url da API de league */
  var url = "https://na.api.pvp.net/api/lol/br/v1.4/summoner/by-name/" + invocador + "?api_key=7c20378c-001e-4639-ab96-669be9f17f7f";
  getUrl(url, response, returnLeagueData);
}

/* pagepage: retorna uma pagina html que busca nos arquivos */
function pagepage(response) {
  //le o arquivo "helloworld.html" e responde para o front.
  fs.readFile('helloworld.html', function(err, data) {
    response.writeHead(200, {
      'Content-Type': 'text/html',
      'Content-Length': data.length
    });
    response.write(data);
    response.end();
  });
}

/* populateMongo: popula o Mongo com dados especificados manualmente */
function populateMongo(response) {
  /* Exemplos de dados para popular o Mongo, podem colocar o de voces*/
  var pikachu = {
    "Nome": "Pikachu",
    "Tipo": "Eletrico",
    "Evolucoes": ["Raichu"]
  }

  var squirtle = {
    "Nome": "Squirtle",
    "Tipo": "Agua",
    "Evolucoes": ["Wartortle", "Blastoise"]
  }

  var wartortle = {
    "Nome": "Wartortle",
    "Tipo": "Agua",
    "Evolucoes": ["Blastoise"]
  }

  var pokemons = [pikachu, squirtle, wartortle];
  var colecao = "Pokemons";

  /* Insiro todos no banco de dados */
  models.connectToMongo(response, colecao, pokemons, models.insertDocuments);
}

/* getAllFromMongo: retorna todos os documentos da colecao especificada */
function getAllFromMongo(response) {
  /* Setando colecao para Pokemons e filtro para vazio para retornar todos*/
  var colecao = "Usuarios";
  var filtro = {};

  /* Faco a busca para retornar todos */
  models.connectToMongo(response, colecao, filtro, models.getDocuments);
}

/* TODO: parametrizar a funcao de remocao :D */
function removeFromMongo(response) {
  var filtro = {};
  var colecao = "Pokemons";
  models.connectToMongo(response, colecao, filtro, models.removeDocuments);
}

/* printJson: recebe um json via most e responde o mesmo json */
function printJson(response, request) {
  models.end_request(response, request.body);
}

/* insereJson: insere os dados de um json em uma colecao
 * @request.body exemplo: {"dados": {"especie": "golfinho"},
 *                         "colecao": "animais"}
 * responde: os dados inserids no Mongo
 */
function insereJson(response, request) {
  //console.log(request);
  console.log(request.body);
  console.log("##########");
  
  
   
  /* Lembrete: sou eu que defino qual vai ser o formato de JSON aceito.
     Neste caso defini o formato:
        { "dados": {}, "colecao": "nome_da_colecao"}
     Portanto, acesso os dados como request.body.dados e
       acesso a colecao como request.body.colecao
     Se eu tivesse definido meu formato padrao de json como:
        { "banana": {"cor": "amarela"}, "fruta": "doce"},
        eu acessaria os dados de banana como request.body.banana
        e a caracteristica de fruta como request.body.fruta.
     Portanto, é preciso verificar se os dados definidos batem com os
        dados especificados.*/
  var exemplo_valido = {
    "dados": {
      "nome": "Pikachu",
      "tipo": "Eletrico"
    },
    "colecao": "Pokemons"
  };
  // Verifica se esta valido
  if (!request.body.dados || !request.body.colecao) {
    erro_json_invalido(response, exemplo_valido);
    return;
  }
  // Extrai os dados e realiza o inserte.
  var dados = request.body.dados;
  var colecao = request.body.colecao;
  // Coloquei [ ] ao redor de dados pois estou usando o insertMany na funcao em
  // models. Porem, como eh um vetor de 1 elemento, insere só um.
  models.connectToMongo(response, colecao, [dados], models.insertDocuments);
}

/* buscafiltro: busca os dados em uma colecao, utilizando um filtro
 * @request.body exemplo: {"filtro": {"classe": "mamifero"},
 *                         "colecao": "animais"}
 *               filtraria por todos os animais mamiferos :3
 *               Lembrando que filtro {} retorna todos da colecao
 * responde: resultados da busca.
 */
function buscafiltro(response, request) {
  /* Lembrete: sou eu que defino qual vai ser o formato de JSON aceito.
     Neste caso defini o formato:
        { "filtro": {}, "colecao": "nome_da_colecao"}
     Portanto, acesso os dados como request.body.filtro e
       acesso a colecao como request.body.colecao
     Se eu tivesse definido meu formato padrao de json como:
        { "banana": {"cor": "amarela"}, "fruta": "doce"},
        eu acessaria os dados de banana como request.body.banana
        e a caracteristica de fruta como request.body.fruta.
     Portanto, é preciso verificar se os dados definidos batem com os
        dados especificados.*/
  var exemplo_valido = {
    "filtro": {
      "tipo": "Agua"
    },
    "colecao": "Pokemons"
  };
  // Verifica se esta valido
  if (!request.body.filtro || !request.body.colecao) {
    erro_json_invalido(response, exemplo_valido);
    return;
  }
  // Realiza a busca na colecao utilizando o filtro.
  var filtro = request.body.filtro;
  var colecao = request.body.colecao;
  models.connectToMongo(response, colecao, filtro, models.getDocuments);
}


function removefiltro(response, request) {
  var exemplo_valido = {
    "filtro": {
      "tipo": "Agua"
    },
    "colecao": "Pokemons"
  };
  // Verifica se esta valido
  if (!request.body.filtro || !request.body.colecao) {
    erro_json_invalido(response, exemplo_valido);
    return;
  }
  // Realiza a busca na colecao utilizando o filtro.
  var filtro = request.body.filtro;
  var colecao = request.body.colecao;
  models.connectToMongo(response, colecao, filtro, models.removeDocuments);
}


// Lembrem-se sempre dos exports, eles seram utilizados no arquivo index.js :D
exports.start = start;
exports.upload = upload;
exports.show = show;
exports.initialPokemon = initialPokemon;
exports.myLeagueData = myLeagueData;
exports.pagepage = pagepage;
exports.populateMongo = populateMongo;
exports.getAllFromMongo = getAllFromMongo;
exports.removeFromMongo = removeFromMongo;
exports.printJson = printJson;
exports.insereJson = insereJson;
exports.buscafiltro = buscafiltro;
exports.removefiltro = removefiltro;
