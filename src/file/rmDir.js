var exists    = require('./exists')
var dir       = require('../path/directory')
var eachAsync = require('../async/iterate').each
var assert    = require('assert')
var fs        = require('fs')
var path      = require('path')

function rmdir (dirName, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {empty: false}
  }

  exists(dirName, function (dirExists) {
    if (!dirExists) {
      cb('Directory ' + dirName + ' does not exist.')
    } else {
      dir.files(dirName, 'all', function (err, collectionOf) {
        assert.ifError(err)

        eachAsync(collectionOf.files, function (file, key, done) {
          fs.unlink(file, function (err) {
            assert.ifError(err)
            done(null, file)
          })
        }, function (err, results) {
          assert.ifError(err)

          eachAsync(collectionOf.dirs.reverse(), function (dirs, key, done) {
            fs.rmdir(dirs, function (err) {
              assert.ifError(err)
              done(null, dirs)
            })
          }, function (err, results) {
            assert.ifError(err)

            if (!opts.empty)
              fs.rmdir(dirName, function (err) {
                assert.ifError(err)
                return cb('Directory ' + dirName + ' removed')
              })
            else return cb('Directory ' + dirName + ' emptied')
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
