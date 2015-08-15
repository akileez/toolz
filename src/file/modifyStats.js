var path = require('path')

function modifyStatsObject (stats, fp) {
  return {
    path     : dir,
    basename : path.basename(dir),
    dirname  : path.dirname(dir),
    extname  : path.extname(dir),
    stats    : stats
  }
}

module.exports = modifyStatsObject
