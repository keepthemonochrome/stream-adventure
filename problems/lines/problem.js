var split = require('split');
var through = require('through2');

// process.stdin
//   .pipe(split())
//   // .pipe(through(function(chunk, enc, callback){
//   //   var newchunk = chunk.toString().toLowerCase();
//   //   // console.log
//   //   this.push(newchunk);
//   //   callback();
//   //   // console.log(chunk)
//   // }))
//   .pipe(process.stdout);
var flag = true;
var split = require('split');
  process.stdin
      .pipe(split(''))
      // .pipe()
      .pipe(through(function (line, _, next) {
          if(flag){
            console.log(line.toString().toLowerCase());
          } else {
            console.log(line.toString().toUpperCase());
          }
          flag = !flag;
          // console.log(line.toString());
          next();
      }))
  ;
