var fsreadFile = require('fs').readFile
var fsreadFileSync = require('fs').readFileSync
var assert = require('assert')

function readFile (fp, opts, cb) {
  if (arguments.length === 1) return fsreadFileSync(fp, 'utf8')

  if (arguments.length === 2) {
    if (typeof opts === 'function') {
      cb = opts
      opts = 'utf8'
    } else {
      return fsreadFileSync(fp, opts)
    }
  }

  fsreadFile(fp, opts, function (err, data) {
    assert.ifError(err)
    cb(null, data)
  })
}

// function readStream (fp, opts) {
//   return fs.createReadStream(fp, opts)
// }

module.exports = readFile
// module.exports.stream = readStream
