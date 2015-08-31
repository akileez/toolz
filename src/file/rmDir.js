var exists  = require('./exists')
var rmFile  = require('./rmFile')
var dir     = require('../path/directory')
var forEach = require('../array/forEach')
var fs      = require('fs')
var path    = require('path')

// make async version
function rmdir (dirName, cb) {
  exists(dirName, function (res) {
    if (!res) {
      cb('Directory does not exist.')
    } else {
      dir.files(dirName, 'all', function (err, res) {
        forEach(res.files, function (val, key, arr) {
          rmFile(val)
        })
        forEach(res.dirs, function (val, key, arr) {
          fs.rmdirSync(val)
        })
        fs.rmdirSync(dirName)
        cb(null, 'All done')
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
