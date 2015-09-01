var path      = require('path')
var assert    = require('assert')
var readFile  = require('./readFile')
var writeFile = require('./writeFile')
var eachAsync = require('../async/iterate').each

// THIS NEEDS WORK, but not today.
function copy (files, dest, cb) {
  files = Array.isArray(files) ? files : [files]

  eachAsync(files, function (file, key, done) {
    readFile(file, function (err, data) {
      assert.ifError(err)
      writeFile(path.resolve(dest, file), data, function (err) {
        assert.ifError(err)
        done(null, 'File ' + file + 'copied to ' + dest)
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
    var destFile = path.resolve(dest, file)
    var content = readFile(file)
    writeFile(destFile, content)
  })
}

module.exports = copy
module.exports.sync = copySync
