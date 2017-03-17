var fs = require('fs');
// console.log('file(process.argv[2]: ', process.argv[2]);
fs.createReadStream(process.argv[2]).pipe(process.stdout);
