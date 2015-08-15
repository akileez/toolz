var fs = require('fs')

function isCharacterDevice (fp, cb) {
  if (arguments.length === 1) return fs.lstatSync(fp)['isCharacterDevice']()
  fs.lstat(fp, function (err, stats) {
    if (err) throw err
    cb(stats ? stats.isCharacterDevice() : false)
  })
}

module.exports = isCharacterDevice
