var path      = require('path')
var readFile  = require('./readFile')
var writeFile = require('./writeFile')

// make async version

function copy (files, dest) {
  files = Array.isArray(files) ? files : [files]

  files.forEach(function (file) {
    var destFile = path.resolve(dest, file)
    var content = readFile(file)
    writeFile(destFile, content)
  })
}

module.exports = copy
