'use strict'

const exists    = require('./exists')
const dir       = require('../path/directory')
const iterate   = require('../async/iterate').each
const mkdirp    = require('./mkdirp')
const assert    = require('assert')
const fs        = require('fs')

function moveFiles (src, dest, opts, cb) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {empty: false}
  }

  exists(src, (dirExists) => {
    if (!dirExists) return cb('Directory ' + src + ' does not exist.')

    dir.files(src, 'all', (err, collectionOf) => {
      assert.ifError(err)

      iterate(collectionOf.files, (file, key, done) => {
        let destfile = dest + file.replace(src + '/', '')

        fs.rename(file, destfile, (err) => {
          if (err) {
            mkdirp(destfile, (err) => {
              assert.ifError(err)
              fs.unlink(file, (err) => {
                assert.ifError(err)
                done(null, file)
              })
            })
          } else {
            done(null, file)
          }
        })
      }, (err, results) => {
        assert.ifError(err)

        iterate(collectionOf.dirs.reverse(), (dirs, key, done) => {
          fs.rmdir(dirs, (err) => {
            assert.ifError(err)
            done(null, dirs)
          })
        }, (err, results) => {
          assert.ifError(err)

          if (!opts.empty)
            fs.rmdir(src, (err) => {
              assert.ifError(err)
              return cb('Directory ' + src + ' removed')
            })
          else return cb('Directory ' + src + ' emptied')
        })
      })
    })
  })
}

module.exports = moveFiles
