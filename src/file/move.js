var exists    = require('./exists')
var dir       = require('../path/directory')
var eachAsync = require('../async/iterate').each
var mkdirp    = require('./mkdirp')
var assert    = require('assert')
var fs        = require('fs')
var path      = require('path')

function moveFiles (src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {empty: false}
  }

  exists(src, function (dirExists) {
    if (!dirExists) {
      cb('Directory ' + src + ' does not exist.')
    } else {
      dir.files(src, 'all', function (err, collectionOf) {
        assert.ifError(err)

        eachAsync(collectionOf.files, function (file, key, done) {
          var destfile = file.replace(src + '/', '')
          fs.rename(file, dest + destfile, function (err) {
            if (err) {
              mkdirp(dest + destfile, function (err) {
                assert.ifError(err)
              })
            }
            if (exists(file)) {
              fs.unlink(file, function (err) {
                assert.ifError(err)
                done(null, file)
              })
            } else {
              done(null, file)
            }
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
              fs.rmdir(src, function (err) {
                assert.ifError(err)
                return cb('Directory ' + src + ' removed')
              })
            else return cb('Directory ' + src + ' emptied')
          })
        })
      })
    }
  })
}

module.exports = moveFiles
