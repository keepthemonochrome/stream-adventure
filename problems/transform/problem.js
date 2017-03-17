var through2 = require('through2');
process.stdin
  .pipe(
    through2(function (chunk, enc, callback) {
      const upper = chunk.toString().toUpperCase();
      this.push(upper);
      callback();
   }, function (cb) { // flush function // not necessary
      // this.push('tacking on an extra buffer to the end');
      cb();
    })
  )
  .pipe(process.stdout)
  // .on('finish', function () {
    // console.log('finis')
    //finished
  // });


//notes:
// I don't know why es6 arrow functions does not work here.