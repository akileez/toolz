var path = require('path')

function modifyStatsObject (stats, fp) {
  return {
    path     : fp,
    basename : path.basename(fp),
    dirname  : path.dirname(fp),
    extname  : path.extname(fp),
    stats    : stats
  }
}

module.exports = modifyStatsObject
