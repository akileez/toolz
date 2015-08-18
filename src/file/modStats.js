var path = require('path')
var fs   = require('fs')

/**
 * modify the stats object with more filepath info and content
 * @param  {Object} stats the return object from fs.[stats|lstat]
 * @param  {String} fp    filepath of object to be stated
 * @return {Object}       expanded stats with file content
 */

function modifyStatsObject (stats, fp) {
  return {
    abs   : fs.realpathSync(fp),
    rel   : fp,
    dir   : path.dirname(fp),
    base  : path.basename(fp),
    file  : path.basename(fp, path.extname(fp)),
    ext   : path.extname(fp),
    stats : stats,
    data  : fs.readFileSync(fp, 'utf8')
  }
}

module.exports = modifyStatsObject
