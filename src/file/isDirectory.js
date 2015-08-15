var fs = require('fs')

function isDirectory (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isDirectory']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isDirectory() : false)
  })
}

module.exports = isDirectory
