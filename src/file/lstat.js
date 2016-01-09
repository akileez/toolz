var fs = require('fs')

function lstat (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)
  fs.lstat(fp, function (err, stats) {
    cb(err, stats)
  })
}

module.exports = lstat
