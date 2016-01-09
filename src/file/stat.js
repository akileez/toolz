var fs = require('fs')

function stat (fp, cb) {
  if (arguments.length === 1) return fs.statSync(fp)
  fs.stat(fp, function (err, stats) {
    cb(err, stats)
  })
}

module.exports = stat
