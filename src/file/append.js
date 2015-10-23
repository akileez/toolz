// keeping this basic at the moment. just want to fill in a
// hole and supplement a script.

var fs = require('fs')

function append (dest, data, cb) {
  fs.appendFile(dest, data, cb)
}

function appendSync (dest, data) {
  fs.appendFileSync(dest, data)
}

module.exports = append
module.exports.sync = appendSync
