var http = require('http');
var fs = require('fs');
var through = require('through2');

var server = http.createServer(function(req, res){

  if(req.method === 'POST'){
    req.pipe(through(function(buf, _, next){
      this.push(buf.toString().toUpperCase());
      next();
    }, function(done){
      done();
    }))
    .pipe(res);
  }

});

server.listen(process.argv[2]);