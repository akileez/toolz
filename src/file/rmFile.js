var fs = require('fs')
var assert = require('assert')
var exists = require('./exists')

// make async version

function rmFile (file, cb) {
  exists(file, function (res) {
    if (!res) return cb('File does not exist')
    fs.unlink(file, function (err) {
      assert.ifError(err)
      cb('File ' + file + ' successfully removed.')
    })
  })
}

function rmFileSync (file) {
  if (exists(file)) fs.unlinkSync(file)
}

module.exports = rmFile
module.exports.sync = rmFileSync
