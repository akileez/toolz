var fs = require('fs')

// make async version ?

function preserveTimeStamps (from, to) {
  var fileStats = from instanceof fs.Stats ? from : fs.statSync(from)
  fs.utimesSync(to, fileStats.atime, fileStats.mtime)
}

module.exports = preserveTimeStamps
