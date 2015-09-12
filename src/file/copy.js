var path      = require('path')
var assert    = require('assert')
var stat      = require('./stat')
var exists    = require('./exists')
var readFile  = require('./readFile')
var writeFile = require('./writeFile')
var name      = require('../path/name')
var segments  = require('../path/segments')
var eachAsync = require('../async/iterate').map
var randHex   = require('../random/randHex')
var rename    = require('../string/placeholders')

// THIS STILL NEEDS WORK!!
// optional rename function or parent path segment instead of randHex.
// better error handling.
function copy (files, dest, opts, cb) {
  var defaults = {flatten: false, noclobber: false}

  if (typeof opts === 'function') {
    cb = opts
    opts = defaults
  } else {
    opts = opts || defaults
  }

  files = Array.isArray(files) ? files : [files]

  eachAsync(files, function (file, key, done) {
    readFile(file, function (err, data) {
      assert.ifError(err)

      var method
      var filepath
      var destination

      if (opts.flatten) method = 'last'
      else method = 'fromFirst'

      filepath = segments[method](file) || file
      destination = path.resolve(dest, filepath)

      if (opts.noclobber && exists(destination)) {
        if (stat(destination).content === stat(file).content) {
          return done(null, file)
        } else {
          var fn = rename()(':dest/:file:vers:ext')
          destination = fn({
            dest : name.dir(destination),
            file : name.file(destination),
            ext  : name.ext(destination),
            vers : '-' + randHex(4)
          })
        }
      }

      writeFile(destination, data, function (err) {
        assert.ifError(err)
        done(null, file)
      })
    })
  }, function (err, res) {
    assert.ifError(err)
    cb(res)
  })
}

function copySync (files, dest) {
  files = Array.isArray(files) ? files : [files]

  files.forEach(function (file) {
    var destFile = path.resolve(dest, segments.fromFirst(file))
    var content = readFile(file)
    writeFile(destFile, content)
  })
}

module.exports = copy
module.exports.sync = copySync
