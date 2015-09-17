var path   = require('path')
var isFile = require('../file/isFile')

function root () {
  return process.cwd().split(/[\\\/]/g).slice(-1)[0]
}

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

function parse (fp) {
  return {
    root : root(),
    dir  : dirname(fp),
    base : basename(fp),
    ext  : extname(fp),
    name : filename(fp)
  }
}

exports.file  = filename
exports.base  = basename
exports.dir   = dirname
exports.ext   = extname
exports.root  = root
exports.parse = parse
