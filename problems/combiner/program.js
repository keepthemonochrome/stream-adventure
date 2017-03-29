var combine = require('stream-combiner2')
var split = require('split');
var through = require('through2');
var zlib = require('zlib');
var gzip = zlib.createGzip();

module.exports = function () {
  var temp = {};
  var splitted = split();
  var json = through(
    function write(buf, _, next){
      buf = JSON.parse(buf);
      if(buf.type === "genre"){
        if(Object.keys(temp).length !== 0) this.push(JSON.stringify(temp)+'\n');
          temp = {"name":buf.name, "books":[]};
      } else if(buf.type === "book"){
        temp["books"].push(buf.name);
      }
      next();
    }
  , function end(next){ // end function to push the last remaining temp obj
      if(Object.keys(temp).length !== 0) this.push(JSON.stringify(temp) + '\n');
      next();
    }
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
