var path   = require('path')
var fs     = require('fs')
var mkdirp = require('./mkdirp')
var exists = require('./exists')
var assert = require('assert')

function writeFile (file, data, enc, cb) {
  var dir
  if ((arguments.length === 3 && typeof enc !== 'function') || arguments.length === 2) {
    enc = enc || 'utf8'
    dir = path.dirname(file)
    if (exists(dir)) return fs.writeFileSync.apply(fs, arguments)

    mkdirp.sync(dir)
    return fs.writeFileSync.apply(fs, arguments)
  }

  if (typeof enc === 'function') {
    cb = enc
    enc = 'utf8'
  }

  dir = path.dirname(file)
  exists(dir, function (res) {
    if (res) return fs.writeFile(file, data, enc, cb)

    mkdirp(dir, function (err) {
      if (err) return cb(err)
      fs.writeFile(file, data, enc, cb)
    })
  })
}

function writeStream (file, options) {
  mkdirp(path.dirname(file), function (err) {
    assert.ifError(err)
    fs.createWriteStream(file, options)
  })
}

module.exports = writeFile
module.exports.stream = writeStream
