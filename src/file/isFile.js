var fs = require('fs')

function isFile (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isFile']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isFile() : false)
  })
}

module.exports = isFile
