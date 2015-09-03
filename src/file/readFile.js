var fs = require('fs')
var assert = require('assert')

function readFile (fp, opts, cb) {
  if (arguments.length === 1) return fs.readFileSync(fp, 'utf8')

  if (arguments.length === 2 && typeof opts === 'function') {
    cb = opts
    opts = 'utf8'
  } else {
    return fs.readFileSync(fp, opts)
  }

  fs.readFile(fp, opts, function (err, data) {
    assert.ifError(err)
    cb(null, data)
  })
}

function readStream (fp, opts) {
  return fs.createReadStream(fp, opts)
}

module.exports = readFile
module.exports.stream = readStream
