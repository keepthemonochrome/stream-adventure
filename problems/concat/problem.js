// steps
// 1. make the whole input string(?) into array of letters
// 2. use through2 to reverse them
// (A transform stream takes input data and applies an operation to the data to produce the output data.)
// 3. use concat-stream to concat the chunks in reversed order - JS has Array.prototype.reverse()


// my version fails
// var split = require('split');
// var concat = require('concat-stream');
// var through = require('through2');
// var concatStream = concat(through(function(chunk, enc, callback){
// }));
// process.stdin
//   .pipe(split(""))
//   .pipe(through(function(chunk, enc, callback) {
//     console.log(chunk.toString()+'@');
//     callback();
//   }))
//   .pipe(process.stdout);





var concat = require('concat-stream');
var concatStream = concat(function(data){
  console.log(data.toString().split('').reverse().join(''));
});
process.stdin.pipe(concatStream);