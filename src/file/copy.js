var path      = require('path')
var assert    = require('assert')
var readFile  = require('./readFile')
var writeFile = require('./writeFile')
var segments  = require('../path/segments')
var eachAsync = require('../async/iterate').map

// THIS NEEDS WORK!!
// options: flatten, preserve [dir structure], noclobber.
function copy (files, dest, cb) {
  files = Array.isArray(files) ? files : [files]

  eachAsync(files, function (file, key, done) {
    readFile(file, function (err, data) {
      assert.ifError(err)

      var filepath = segments.fromFirst(file)
      var destination = path.resolve(dest, filepath)

      writeFile(destination, data, function (err) {
        assert.ifError(err)
        done(null, 'File ' + file + ' copied to ' + [dest, filepath].join('/'))
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
