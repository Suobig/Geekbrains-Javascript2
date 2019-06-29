var http = require('http');
var url = require("url");
var queryString = require("querystring");
var static = require('node-static');
var file = new static.Server('.', {
  cache: 0
});

function accept(req, res) {  
  if (req.url === '/phones.json') {
    //Искусственная задержка для наглядности
    setTimeout(() => {
      file.serve(req, res);
    }, 1000);
  } else {
    file.serve(req, res);
  }
}

if (!module.parent) {
  http.createServer(accept).listen(8080);
} else {
  exports.accept = accept;
}

console.log('Server running on port 8080');
