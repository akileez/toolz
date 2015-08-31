var fs = require('fs')
var assert = require('assert')
var exists = require('./exists')

// make async version

function rmFile (file, cb) {
  exists(file, function (res) {
    if (!res) return cb('File does not exist')
    // figure out callback parameters for fs.unlink. don't think its err, res
    fs.unlink(file, function (err, result) {
      assert.ifError(err)
      cb('File removed successfully.')
    })
  })
}

function rmFileSync (file) {
  if (exists(file)) fs.unlinkSync(file)
}

module.exports = rmFile
module.exports.sync = rmFileSync
