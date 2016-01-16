// https://github.com/ianstormtaylor/read-file-stdin

var gather = require('../stream/gather-stream')
var fs = require('fs')

function read (file, callback) {
  if (typeof file === 'function') {
    callback = file
    file = null
  }

  var stream = file
    ? fs.createReadStream(file)
    : process.stdin

  stream.pipe(gather(callback))
}

module.exports = read
