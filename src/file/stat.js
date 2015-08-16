var fs = require('fs')
var modStats = require('./modStats')

function stat (fp, cb) {
  if (arguments.length === 1) return modStats(fs.statSync(fp), fp)
  fs.stat(fp, function (err, stats) {
    cb(err, stats ? modStats(stats, fp) : stats)
  })
}

module.exports = stat
