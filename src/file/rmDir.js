var exists = require('./exists')
var fs = require('fs')
var path = require('path')

// make async version

function rmdir (dirName) {
  if (!exists(dirName)) return
  fs.readdirSync(dirName).forEach(function (file) {
    var fullPath = path.join(dirName, file)
    if (fs.statSync(fullPath).isDirectory()) rmdir(fullPath)
    else fs.unlinkSync(fullPath)
  })

  fs.rmdirSync(dirName)
}

module.exports = rmdir
