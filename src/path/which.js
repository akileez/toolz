// node-which <https://github.com/npm/node-which>
// Copyright (c) Isaac Z. Schlueter and Contributors (ISC)

module.exports = which
which.sync = whichSync

// Like the unix which utility.

// Finds the first instance of a specified executable in the PATH environment variable.
// Does not cache the results, so hash -r is not needed when the PATH changes.

/*
    var which = require('which')

    // async usage
    which('node', function (er, resolvedPath) {
      // er is returned if no "node" is found on the PATH
      // if it is found, then the absolute path to the exec is returned
    })

    // sync usage
    // throws if not found
    var resolved = which.sync('node')

    // Pass options to override the PATH and PATHEXT environment vars.
    which('node', { path: someOtherPath }, function (er, resolved) {
      if (er)
        throw er
      console.log('found at %j', resolved)
    })

 */

var isWindows = process.platform === 'win32'
  || process.env.OSTYPE === 'cygwin'
  || process.env.OSTYPE === 'msys'

var path = require('path')
var COLON = isWindows ? ';' : ':'
var isExe
var fs = require('fs')
var isAbsolute = require('is-absolute')

var G =  parseInt('0010', 8)
var U =  parseInt('0100', 8)
var UG = parseInt('0110', 8)

if (isWindows) {
  // On windows, there is no good way to check that a file is executable
  isExe = function isExe () { return true }
} else {
  isExe = function isExe (mod, uid, gid) {
    var ret = (mod & 1)
        || (mod & G)  && process.getgid && gid === process.getgid()
        || (mod & U)  && process.getuid && uid === process.getuid()
        || (mod & UG) && process.getuid && 0   === process.getuid()

    if (!ret && process.getgroups && (mod & G)) {
      var groups = process.getgroups()
      for (var g = 0; g < groups.length; g++) {
        if (groups[g] === gid)
          return true
      }
    }

    return ret
  }
}

function getPathInfo(cmd, opt) {
  var colon = opt.colon || COLON
  var pathEnv = opt.path || process.env.PATH || ''
  var pathExt = ['']

  pathEnv = pathEnv.split(colon)

  if (isWindows) {
    pathEnv.unshift(process.cwd())
    pathExt = (opt.pathExt || process.env.PATHEXT || '.EXE').split(colon)
    if (cmd.indexOf('.') !== -1 && pathExt[0] !== '')
      pathExt.unshift('')
  }

  // If it's absolute, then we don't bother searching the pathenv.
  // just check the file itself, and that's it.
  if (isAbsolute(cmd))
    pathEnv = ['']

  return {env: pathEnv, ext: pathExt}
}

function which (cmd, opt, cb) {
  if (typeof opt === 'function') {
    cb = opt
    opt = {}
  }

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var found = []

  ;(function F (i, l) {
    if (i === l) {
      if (opt.all && found.length)
        return cb(null, found)
      else
        return cb(new Error('not found: '+cmd))
    }

    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.resolve(pathPart, cmd)
    ;(function E (ii, ll) {
      if (ii === ll) return F(i + 1, l)
      var ext = pathExt[ii]
      fs.stat(p + ext, function (er, stat) {
        if (!er &&
            stat.isFile() &&
            isExe(stat.mode, stat.uid, stat.gid)) {
          if (opt.all)
            found.push(p + ext)
          else
            return cb(null, p + ext)
        }
        return E(ii + 1, ll)
      })
    })(0, pathExt.length)
  })(0, pathEnv.length)
}

function whichSync (cmd, opt) {
  opt = opt || {}

  var info = getPathInfo(cmd, opt)
  var pathEnv = info.env
  var pathExt = info.ext
  var found = []

  for (var i = 0, l = pathEnv.length; i < l; i ++) {
    var pathPart = pathEnv[i]
    if (pathPart.charAt(0) === '"' && pathPart.slice(-1) === '"')
      pathPart = pathPart.slice(1, -1)

    var p = path.join(pathPart, cmd)
    for (var j = 0, ll = pathExt.length; j < ll; j ++) {
      var cur = p + pathExt[j]
      var stat
      try {
        stat = fs.statSync(cur)
        if (stat.isFile() && isExe(stat.mode, stat.uid, stat.gid)) {
          if (opt.all)
            found.push(cur)
          else
            return cur
        }
      } catch (ex) {}
    }
  }

  if (opt.all && found.length)
    return found

  throw new Error('not found: '+cmd)
}
