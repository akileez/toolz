var fs      = require('fs')
var revHash = require('./revHash')
var revPath = require('./revPath')

function revFile (fp) {
  return revPath(fp, revHash(fs.readFilesync(fp)))
}

module.exports = revFile
