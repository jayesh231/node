var http = require('http');
var express = require('express');
var router = express.Router();

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
  console.log(req.body);
  })
server.listen(port, hostname, function(){
  console.log(`Server running at http://${hostname}:${port}/`);
});

router.get('/', function(req, res, next) {
  console.log(req.body);
});



