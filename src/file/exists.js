var fs = require('fs')

function exists (filepath, cb) {
  fs.stat(filepath, function (err, stats) {
    if (err) return cb(err, false)
    cb(null, stats)
  })
}

function existsSync (filepath) {
  fs.stat(filepath, function (err, stats) {
    if (stats) return true
    if (err) return false
  })
}

module.exports = exists
module.exports.sync = existsSync