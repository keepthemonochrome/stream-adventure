// var ws = require('websocket-stream');
// var through = require('through2');

// var stream = ws('ws://localhost:8099');
// // ws.send('hello\n');
// // "hello\n".pipe(stream);
// stream.pipe(through((buf, _, next) => {
//   this.push("hello\n");
//   next();
// }, (done) => done()));

var ws = require('websocket-stream');

var stream = ws('ws://localhost:8099');
// stream.write('hello\n'); //???? Cannot find anywhere in the doc
stream.send('hello\n'); // also possible
