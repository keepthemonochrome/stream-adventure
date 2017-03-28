var combine = require('stream-combiner2')
var split = require('split');
var through = require('through2');
var zlib = require('zlib');
var gzip = zlib.createGzip();
    module.exports = function () {
      var temp = {};
      var splitted = split();
      var json = through(function(buf, _, next){

        if(buf.type === "genre"){
          this.push(temp);
          temp = {"name":buf.name, "books":[]};
        } else if(buf.type === "book"){
          temp["books"].push(buf.name);
        }
        next();
      }
    // , function end(next){ this.push(temp + '\n'); next();}
  );

        return combine(
            // read newline-separated json,
            splitted,
            // group books into genres,
            json,
            // then gzip the output
            gzip
        )
    }
