var trumpet = require('trumpet');
var tr = trumpet();
var fs = require('fs');
var through = require('through2');

var thru = through(function (buf, _, next) {
    // console.log(this); // this binded to stream obj
    this.push(buf.toString().toUpperCase());
    next();
});

fs.createReadStream('input.html').pipe(tr);
var stream = tr.select('.loud').createStream();
var entireStream = tr.select
stream.pipe(thru).pipe(process.stdout)



// NOTE: CANNOT USE ARROW FUNCTIONS DUE TO THIS BINDING
// ES2015 introduced arrow functions whose this is lexically scoped (it is set to the this value of the enclosing execution context).
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions

// var thru = through((buf, _, callback) => {
  // this.push(buf.toString().toUpperCase());
  // callback();
// });
