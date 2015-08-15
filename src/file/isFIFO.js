var fs = require('fs')

function isFIFO (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isFIFO']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isFIFO() : false)
  })
}

module.exports = isFIFO
