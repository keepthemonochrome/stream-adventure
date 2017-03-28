var spawn = require('child_process').spawn;
var duplexer2 = require('duplexer2');

// var readable = process.stdin;
// var writable = process.stdout;
// var duplex = duplexer2(readable, writable);

module.exports = function (cmd, args){
  // spawn the process and return a single stream
  var child = spawn(cmd, args);
  return duplexer2(child.stdin, child.stdout);
  // joining together the stdin and stdout here
  // child.stdout.on('data', (data) => {
  //   // console.log(`stdout: ${data}`);
  // });
  //
  // child.stderr.on('data', (data) => {
  //   console.log(`stderr: ${data}`);
  // });
  //
  // child.on('close', (code) => {
  //   console.log(`child process exited with code ${code}`);
  // });

}
