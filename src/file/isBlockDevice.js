var fs = require('fs')

function isBlockDevice (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isBlockDevice']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isBlockDevice() : false)
  })
}

module.exports = isBlockDevice
