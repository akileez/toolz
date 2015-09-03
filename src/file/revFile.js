var fs      = require('fs')
var revHash = require('./revHash')
var revPath = require('./revPath')

function revFile (fp) {
  return revPath(fp, revHash(fs.readFileSync(fp)))
}

module.exports = revFile
