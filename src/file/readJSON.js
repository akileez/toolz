var readFile = require('./readFile')

function readJSON (file, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {reviver: null}
  }

  readFile(file, function (err, data) {
    if (err) return cb(err)
    try {
      var json = JSON.parse(data, opts.reviver ? opts.reviver : null)
    } catch (err0) {
      return cb(err0)
    }

    cb(null, obj)
  })
}

function readJSONsync (file, opts) {
  opts = opts || {reviver: null, throws: false}

  var shouldThrow = 'throws' in opts ? opts.throws : true
  if (shouldThrow) return JSON.parse(readFile(file), opts.reviver)
  else {
    try {
      return JSON.parse(readFile(file), opts.reviver)
    } catch (err) {
      return null
    }
  }
}

module.exports = readJSON
module.exports.sync = readJSONsync
