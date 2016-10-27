var extend = require('../object/extend')
var filter = require('../object/filter')
var lstat  = require('./lstat')
var path   = require('path')
var fs     = require('fs')

/*

  fp (filepath) [string] file path to read
  fc (filecontent) [object|function] object or function returning an object to mixin

  return an object with filepath and stats metadata

*/

// virtualFileObject: normalized file object
function vfo (fp, fc) {
  if (typeof fc === 'function') {
    return extend(vfp(fp), fc(fp))
  }

  if (typeof fc === 'object' && fc.constructor === Object) {
    return extend(vfp(fp), fc)
  }
}

// virtualFileStats: file stats metadata sans functions
function vfs (fp, fc) {
  var filterd = filter(lstat(fp), (val) => {
    return typeof val !== 'function'
  })

  if (typeof fc === 'function') {
    return extend(vfp(fp), {stats: filterd}, fc(fp))
  }

  if (typeof fc === 'object' && fc.constructor === Object) {
    return extend(vfp(fp), {stats: filterd}, fc)
  }
}

// virtualFileStats: file stats metadata
function vff (fp, fc) {
  if (typeof fc === 'function') {
    return extend(vfp(fp), {stats: lstat(fp)}, fc(fp))
  }

  if (typeof fc === 'object' && fc.constructor === Object) {
    return extend(vfp(fp), {stats: lstat(fp)}, fc)
  }
}

// virtualFilePath: file path metadata
function vfp (fp) {
  return {
    path : {
      abs  : fs.realpathSync(fp),
      rel  : fp,
      root : process.cwd().split(/[\\\/]/g).slice(-1)[0],
      home : path.dirname(fp),
      name : path.basename(fp),
      base : path.basename(fp, path.extname(fp)),
      ext  : path.extname(fp)
    }
  }
}

module.exports = vfo
module.exports.stats = vfs
module.exports.statsf  = vff
