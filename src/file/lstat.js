var fs = require('fs')
var modStats = require('./modStats')

function lstat (fp, cb) {
  if (arguments.length === 1) return modStats(fs.lstatSync(fp), fp)
  fs.lstat(fp, function (err, stats) {
    cb(err, stats ? modStats(stats, fp) : stats)
  })
}

module.exports = lstat
