var fs = require('fs')
var assert = require('assert')

function readFile (fp, opts, cb) {
  if (arguments.length === 1) return fs.readFileSync(fp, 'utf8')

  if (typeof opts === 'function') {
    cb = opts
    opts = 'utf8'
  }

  fs.readFile(fp, opts, function (err, data) {
    assert.ifError(err)
    cb(null, data)
  })
}

module.exports = readFile
