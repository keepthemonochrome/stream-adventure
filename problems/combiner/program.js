const combine = require('stream-combiner2')
const split = require('split');
const through = require('through2');
const zlib = require('zlib');

module.exports = function () {
  let category = {};
  // catergorize json objs by genre
  const write = function (buf, _, next){
    const line = JSON.parse(buf);
    if(line.type === "genre"){
      if(Object.keys(category).length !== 0) this.push(JSON.stringify(category)+'\n');
        category = {name:line.name, books:[]};
    } else if(line.type === "book"){
      category["books"].push(line.name);
    }
    next();
  }
  // end function to push the last remaining category obj
  const end = function (next){
      if(Object.keys(category).length !== 0) this.push(JSON.stringify(category) + '\n');
      next();
  }

  return combine(
      // read newline-separated json,
      split(),
      // group books into genres,
      through(write, end),
      // then gzip the output
      zlib.createGzip()
  )
}
