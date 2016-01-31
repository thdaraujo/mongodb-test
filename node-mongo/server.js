var http = require("http");
var url = require("url");

var port = process.env.PORT || 5000;

function start(route, handle) {
  function onRequest(request, response) {
   
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    console.log(request.method);
    
    /*Tratamento de Cross-Origin no cloud9*/
    
    response.setHeader('Access-Control-Allow-Origin', '*');

    var requestMethod = request.method.toUpperCase();

    if (requestMethod === "OPTIONS" ) {
        response.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept' );
        response.setHeader('Access-Control-Allow-Methods', 'POST, PUT, GET, DELETE, OPTIONS');
        response.end('Set OPTIONS.');

        return true;
    } else {
        response.setHeader('Content-Type', 'application/json');
    }
    /*Fim*/
    
    if (request.method == 'POST') {
      var jsonString = '';

      request.on('data', function(data) {
        jsonString += data;
      });

      request.on('end', function() {
        if (jsonString){
          request.body = JSON.parse(jsonString);
        }
        else{
          request.body = {};
        }
        route(handle, pathname, response, request);
      });
    } else {
      route(handle, pathname, response, request);
    }
  }

  http.createServer(onRequest).listen(port);
  console.log("Server has started.");
}

exports.start = start;
