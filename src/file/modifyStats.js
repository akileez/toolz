var path = require('path')

function modifyStatsObject (stats, fp) {
  stats.path     = fp
  stats.basename = path.basename(fp)
  stats.dirname  = path.dirname(fp)
  stats.extname  = path.extname(fp)
  return stats
}

module.exports = modifyStatsObject
