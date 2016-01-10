var extend = require('../object/extend')
var path   = require('path')
var fs     = require('fs')

/*

  fp (filepath) [string] file path to read
  fc (filecontent) [object|function] object or function returning an object to mixin

*/

function virtualFileObject (fp, fc) {
  if (typeof fc === 'function') {
    return extend(vfp(fp), fc(fp))
  }

  if (typeof fc === 'object' && fc.constructor === Object) {
    return extend(vfp(fp), fc)
  }
}

 // virtualFilePath
function vfp (fp) {
  return {
    abs  : fs.realpathSync(fp),
    rel  : fp,
    file : {
      root : process.cwd().split(/[\\\/]/g).slice(-1)[0],
      dir  : path.dirname(fp),
      name : path.basename(fp),
      base : path.basename(fp, path.extname(fp)),
      ext  : path.extname(fp)
    }
  }
}

module.exports = virtualFileObject
