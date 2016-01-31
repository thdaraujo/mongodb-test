var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
// Handles das urls
// Passo 1: Sempre definir os handles :D
// 1. Handles do Tutorial de Node Beginner que ja vieram, ficam de exemplo
handle["/"] = requestHandlers.start;
handle["/start"] = requestHandlers.start;
handle["/upload"] = requestHandlers.upload;
handle["/show"] = requestHandlers.show;

// 2. Handles que retornam jsons :3
// initialPokemon -> retorna um json ["charmander", "squirtle", "bulbasaur"]
handle["/initialPokemon"] = requestHandlers.initialPokemon;


/* myLeagueData: recebe um json {"invocador": "nome_de_invocador"} e devolve os
 * dados da API de League of Legends
 */
handle["/myLeagueData"] = requestHandlers.myLeagueData;


// 3. Exemplo de como retornar uma pagina web
// Seria legal vocês tentarem fazer com as paginas do front-end da aula anterior :3
handle["/pagepage"] = requestHandlers.pagepage;


/* 4. Inserir, ver e remover dados via GET
 * insertDocument -> Insere os dados predefinidos no banco
 * getDocumentsFromMongo -> pega todos da coleção predefinida
 * removeFromMongo -> remove todos da colecao predefinida
 */
handle["/populateMongo"] = requestHandlers.populateMongo;
handle["/getDocumentsFromMongo"] = requestHandlers.getAllFromMongo;
handle["/removeFromMongo"] = requestHandlers.removeFromMongo;


// 5. Receber objetos via POST
/* printjson -> recebe via post e devolve o mesmo objeto
 * POST: recebe qualquer json valido
 * RESPONSE: retorna o mesmo json valido
 */
handle["/printjson"] = requestHandlers.printJson;


/* inserejson -> recebe o objeto e a coleção para inserir no mongo
 * POST: recebe como post objetos json com os campos "dados" e "colecao"
 *       ex: {"dados": {"banana": "amarela"}, "colecao": "nome_da_colecao"}
 *           {"banana": "amarela"} poderia ser qualquer json valido
 * RESPONSE: retorna o mesmo objeto inserido.
 */
handle["/inserejson"] = requestHandlers.insereJson;


/* buscafiltro -> recebe o filtro e a coleção para buscar no mongo
 * POST: recebe como post objetos json com os campos "filtro" e "colecao"
 *       ex: {"filtro": {"kiwi": "verde"}, "colecao": "nome_da_colecao"}
 *           {"kiwi": "verde"} é um json com uma tag só.
 *           caso o filtro seja vazio: {} - retorna tudo da colecao
 * RESPONSE: retorna o resultado da busca
 */
handle["/buscafiltro"] = requestHandlers.buscafiltro;
handle["/removefiltro"] = requestHandlers.removefiltro;

server.start(router.route, handle);
