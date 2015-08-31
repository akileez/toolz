var exists    = require('./exists')
var rmFile    = require('./rmFile')
var dir       = require('../path/directory')
var eachAsync = require('../async/iterate').each
var assert    = require('assert')
var fs        = require('fs')
var path      = require('path')

function rmdir (dirName, cb) {
  exists(dirName, function (res) {
    if (!res) {
      cb('Directory ' + dirName + ' does not exist.')
    } else {
      dir.files(dirName, 'all', function (err, res) {
        assert.ifError(err)
        eachAsync(res.files, function (val, key, done) {
          rmFile(val, function (res) {
            done(null, val)
          })
        }, function (err, results) {
          assert.ifError(err)
          eachAsync(res.dirs, function (val, key, done) {
            fs.rmdir(val, function (err) {
              assert.ifError(err)
              done(null, val)
            })
          }, function (err, results) {
            assert.ifError(err)
            fs.rmdir(dirName, function (err) {
              assert.ifError(err)
              return cb('Directory ' + dirName + ' removed')
            })
          })
        })
      })
    }
  })
}

function rmdirSync (dirName) {
  if (!exists(dirName)) return
  fs.readdirSync(dirName).forEach(function (file) {
    var fullPath = path.join(dirName, file)
    if (fs.statSync(fullPath).isDirectory()) rmdir(fullPath)
    else fs.unlinkSync(fullPath)
  })

  fs.rmdirSync(dirName)
}

module.exports = rmdir
module.exports.sync = rmdirSync
