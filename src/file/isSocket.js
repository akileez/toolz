var fs = require('fs')

function isSocket (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isSocket']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isSocket() : false)
  })
}

module.exports = isSocket
