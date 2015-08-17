var path   = require('path')
var fs     = require('fs')
var mkdirp = require('./mkdirp')
var exists = require('./exists')

function writeFile (file, data, enc, cb) {
  if ((arguments.length === 3 && typeof enc !== 'function') || arguments.length === 2) {
    enc = enc || 'utf8'
    var dir = path.dirname(file)
    if (exists(dir)) return fs.writeFileSync.apply(fs, arguments)

    mkdirp.sync(dir)
    return fs.writeFileSync.apply(fs, arguments)
  }

  if (typeof enc === 'function') {
    cb = enc
    enc = 'utf8'
  }

  var dir = path.dirname(file)
  exists(dir, function (res) {
    if (res) return fs.writeFile(file, data, enc, cb)

    mkdirp(dir, function (err) {
      if (err) return cb(err)
      fs.writeFile(file, data, enc, cb)
    })
  })
}

module.exports = writeFile
