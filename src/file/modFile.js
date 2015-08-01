// adopted from sindresorhus/modify-filename (MIT)
// modfp -- modify filepath

var path = require('path')
var isArray = require('../lang/isArray')

function modfp (fp, modifier) {
  if (isArray(fp)) {
    return fp.map(function (val) {
      return modfp(val, modifier)
    })
  }

  var ext = path.extname(fp)
  // write file in return statement or create another module.
  // can be used as basis for permalinks and file renamer
  return path.join(path.dirname(fp), modifier(path.basename(fp, ext), ext))
}

module.exports = modfp
