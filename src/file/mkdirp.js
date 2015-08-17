var path = require('path')
var fs = require('fs')

var _0777 = parseInt('0777', 8)

function mkdirp (p, opts, cb, made) {
  if (typeof opts === 'function') {
    cb = opts
    opts = {}
  } else if (!opts || typeof opts !== 'object') {
    opts = {mode: opts}
  }

  var mode = opts.mode
  var xfs = opts.fs || fs

  if (mode === undefined) mode = _0777 & (~process.umask())

  if (!made) made = null

  cb = cb || function () {}
  p = path.resolve(p)

  xfs.mkdir(p, mode, function (err) {
    if (!err) {
      made = made || p
      return cb(null, made)
    }
    switch (err.code) {
      case 'ENOENT':
        if (path.dirname(p) === p) return cb(err)
        mkdirp(path.dirname(p), opts, function (err, made) {
          if (err) cb(err, made)
          else mkdirp(p, opts, cb, made)
        })
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        xfs.stat(p, function (err2, stat) {
          // if the stat fails, then that's super weird.
          // let the original error be the failure reason.
          if (err2 || !stat.isDirectory()) cb(err, made)
          else cb(null, made)
        })
        break
    }
  })
}

function mkdirpSync (p, opts, made) {
  if (!opts || typeof opts !== 'object') opts = {mode: opts}

  var mode = opts.mode
  var xfs = opts.fs || fs

  if (mode === undefined) mode = _0777 & (~process.umask())
  if (!made) made = null

  p = path.resolve(p)

  try {
    xfs.mkdirSync(p, mode)
    made = made || p
  } catch (err0) {
    switch (err0.code) {
      case 'ENOENT' :
        made = mkdirpSync(path.dirname(p), opts, made)
        mkdirpSync(p, opts, made)
        break

      // In the case of any other error, just see if there's a dir
      // there already.  If so, then hooray!  If not, then something
      // is borked.
      default:
        var stat
        try {
          stat = xfs.statSync(p)
        } catch (err1) {
          throw err0
        }
        if (!stat.isDirectory()) throw err0
        break
    }
  }

  return made
}

module.exports = mkdirp
module.exports.sync = mkdirpSync
