const crypto = require('crypto');
const zlib = require('zlib');
const tar = require('tar');
const through = require('through2');
const concat = require('concat-stream');

const decipher = crypto.createDecipher(process.argv[2], process.argv[3]);

const write = function(buf, _, next){
  // var hash = crypto.createHash("md5");
  // console.log('happening?')
  // hash.update(buf, "hex");
  // this.push(JSON.stringify(hash));
  // console.log(hash)
  var hash = crypto.createHash('md5', { encoding: 'hex' });
  // console.log(hash)
  next();
}

// **** NOTE: order matters -- decipher -> gunzip
process.stdin
  // decipher
  .pipe(decipher)
  // gunzip
  .pipe(zlib.createGunzip())
  // // parse
  .pipe(tar.Parse())
  .on('entry', function(e) {
  //   // console.dir(e.path);
  //   console.error("entry", e.props)
  //   e.on("data", function (c) {
  //     // console.log(JSON.stringify(c.data))
  //     // console.dir(crypto.createHash("md5", { encoding: "hex"}));
  //     // c.data.pipe(crypto.createHash("md5", { encoding: "hex"}));
  if(e.type == "File"){
    // e.pipe(through(write)).pipe(process.stdout)
    var md5 = crypto.createHash('md5', { encoding: 'hex' });
    // e.pipe(md5).pipe(process.stdout);
    e.pipe(md5).pipe(concat(function(src){
      console.log(src.toString() + " " + e.path)
    }))
    // console.log(e.path);
    // e.pipe(through(write))
  }
  //     var hash = crypto.createHash("md5");
  //     hash.update("nooo", "hex");
  //   })
  //   e.on("end", function () {
  //     console.log('done');
  //   })
  })
  // .pipe(through(write))
  // .pipe(process.stdout)
