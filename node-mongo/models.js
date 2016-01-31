/* Este arquivo tem todos as funcoes relacionadas diretamente com o Mongo.*/
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var ObjectId = require('mongodb').ObjectID;
var url = "mongodb://localhost/test";

/* insertDocument: insere vetor de documentos no Mongo.
 * @colecao: string que contem o nome da colecao. Ex: "Pokemons".
 * @dados: vetor que contem dados para serem inseridos no banco.
           Ex: [{"banana": "amarela"}, {"ameixa": "preta"}]
 * @db: variavel que contem o banco de dados aberto
 * @callback: funcao para ser executada ao final da operacao de insercao.
 */
var insertDocuments = function(colecao, dados, db, callback) {
  db.collection(colecao).insertMany(dados, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted a document into the restaurants collection.");
    callback(result);
  });
};

/* getDocuments: busca em uma colecao. aceita filtros.
 * @colecao: string que contem o nome da colecao. Ex: "Pokemons".
 * @filtro: json que contem uma caracteristica para filtrar a busca.
           Ex: {"Tipo": "Eletrico"}
 * @db: variavel que contem o banco de dados aberto
 * @callback: funcao para ser executada ao final da operacao de insercao.
 */
var getDocuments = function(colecao, filtro, db, callback) {
  // Recebo os dados em pequenos pedacinhos e preciso junta-los em data.
  var data = [];
  var cursor = db.collection(colecao).find(filtro);
  // cursor.each = para cada elemento encontrado.
  cursor.each(function(err, doc) {
    assert.equal(err, null);
    // se foi encontrado documento, ele é colocado na data.
    if (doc != null) {
      data.push(doc);
      console.dir(doc);
    } else {
      // finaliza a request e imprime a data.
      callback(data);
    }
  });
};

/* TODO: removeDocuments: busca em uma colecao e remove todos encontrados.
 * @colecao: string que contem o nome da colecao. Ex: "Pokemons".
 * @filtro: json que contem uma caracteristica para filtrar a busca.
           Ex: {"Tipo": "Eletrico"}
 * @db: variavel que contem o banco de dados aberto
 * @callback: funcao para ser executada ao final da operacao de insercao.
 */
var removeDocuments = function(colecao, filtro, db, callback) {
  db.collection(colecao).deleteMany(filtro,
    function(err, results) {
      console.log(results);
      callback(results);
    }
  );
};

/* end_request: servidor finaliza a request iniciada
 * @response: o proprio response do server.
 * @data_print: dados a serem imprimidos na tela.
 */
function end_request(response, data_do_mongo) {
  response.writeHead(200, {
    "Content-Type": "text/json"
  });
  response.write(JSON.stringify(data_do_mongo));
  response.end();
}

/* connectToMongo: conecta ao banco de dados e realiza as funcoes desejadas.
 * @response: o proprio response do server.
 * @colecao: string que contem o nome da colecao. Ex: "Pokemons".
 * @dados: json que contem uma caracteristicas de cada request.
 * @callback: funcao para ser executada.
 */
function connectToMongo(response, colecao, dados, callback) {
  MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    //Executo a funcao enviada por parametro.
    callback(colecao, dados, db, function(result) {
      db.close();
      end_request(response, result);
    });
  });
};

/* Exports lindos-maravilhosos :3 */
exports.insertDocuments = insertDocuments;
exports.getDocuments = getDocuments;
exports.removeDocuments = removeDocuments;
exports.end_request = end_request;
exports.connectToMongo = connectToMongo;
