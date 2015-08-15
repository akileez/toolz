var fs = require('fs')
var modifyStats = require('./modifyStats')

function lstat (fp, cb) {
  if (arguments.length === 1) return modifyStats(fs.statSync(fp), fp)
  fs.lstat(fp, function (err, stats) {
    cb(err, stats ? modifyStats(stats, fp) : stats)
  })
}

module.exports = lstat