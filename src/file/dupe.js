var fs = require('fs')

function dupe (from, to) {
  fs.createReadStream(from).pipe(fs.createWriteStream(to))
}

module.exports = dupe
