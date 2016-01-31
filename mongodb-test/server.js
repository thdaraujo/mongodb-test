var http = require("http");
var url = require("url");
var bodyParser = require('body-parser')

var port = process.env.PORT || 5000;

function start(route, handle) {
  function onRequest(request, response) {
   
    var pathname = url.parse(request.url).pathname;
    console.log("Request for " + pathname + " received.");
    console.log(request.method);
    
    if (request.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        response.writeHead(200, headers);
        response.end();
        return;
    }
    else if (request.method == 'POST') {
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
