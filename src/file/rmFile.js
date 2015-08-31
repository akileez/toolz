var fs = require('fs')
var exists = require('./exists')

// make async version

function rmFile (file) {
  if (exists(file)) fs.unlinkSync(file)
}

module.exports = rmFile
