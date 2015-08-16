var path = require('path')
var fs   = require('fs')

function modifyStatsObject (stats, fp) {
  return {
    abs   : fs.realpathSync(fp),
    rel   : fp,
    dir   : path.dirname(fp),
    base  : path.basename(fp),
    file  : path.basename(fp, path.extname(fp)),
    ext   : path.extname(fp),
    stats : stats
  }
}

module.exports = modifyStatsObject
