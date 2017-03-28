// // ref-sol
// var duplexer = require('duplexer2');
// var through2 = require('through2').obj;
//
// module.exports = function (counter) {
//     // return a duplex stream to count countries on the writable side
//     // and pass through `counter` on the readable side
//     var counts = {};
//     var input = through2(write,end);
//     return duplexer({objectMode: true}, input, counter);
//
//     function write (row, _, next) {
//         counts[row.country] = (counts[row.country] || 0) + 1;
//         next();
//     }
//     function end (done) {
//         counter.setCounts(counts);
//         done();
//     }
// };
//
// var duplexer2 = require("duplexer2");
// var through = require("through2");

// ref-sol2
module.exports = function (counter) {
    var countries = {};
    var input = through.obj(function (obj, encoding, done) {
        if (obj.country in countries)
            countries[obj.country]++;
        else
            countries[obj.country] = 1;
        done();
    });

    return duplex =
      duplexer2({objectMode:true}, input, counter)
      .on("finish", function() {
        counter.setCounts(countries);
      });
};
