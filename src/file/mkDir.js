var exists = require('./exists')
var path   = require('path')
var fs     = require('fs')

// clean up callbacks, add options, protection and checks for specific errors
function mkdir (dirName, callback) {
  exists(dirName, function (result) {
    if (result) return callback(null, "somethingHere")
    mkdir(path.dirname(dirName), function (err, data) {
      fs.mkdir(dirName, function (err) {
        return callback(null, "done")
      })
    })
  })
}

function mkdirSync (dirName) {
  if (!exists(dirName)) {
    mkdirSync(path.dirname(dirName))
    fs.mkdirSync(dirName)
  }
}

module.exports = mkdir
module.exports.sync = mkdirSync
