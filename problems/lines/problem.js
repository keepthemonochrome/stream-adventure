var split = require('split');
var through = require('through2');

var flag = true;
process.stdin
    .pipe(split(''))
    .pipe(through(function (chunk, enc, callback) {
        if(flag){
          console.log(chunk.toString().toLowerCase());
          // console.dir(chunk.toString().toLowerCase());

        } else {
          console.log(chunk.toString().toUpperCase());
          // console.dir(chunk.toString().toUpperCase());
        }
        flag = !flag;
        // console.log(line.toString());
        callback();
    }));


// notes
// - what does console.dir do?
