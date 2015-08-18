var path = require('path')
var isFile = require('../file/isFile')

function extname (fp) {
  return path.extname(fp)
}

function dirname (fp) {
  return isFile(fp)
    ? path.dirname(fp)
    : fp
}

function basename (fp) {
  return path.basename(fp)
}

function filename (fp) {
  return path.basename(fp, path.extname(fp))
}

exports.file = filename
exports.base = basename
exports.dir  = dirname
exports.ext  = extname
