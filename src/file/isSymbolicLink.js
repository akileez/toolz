var fs = require('fs')

function isSymbolicLink (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isSymbolicLink']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isSymbolicLink() : false)
  })
}

module.exports = isSymbolicLink
