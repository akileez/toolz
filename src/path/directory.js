// adopted from: https://github.com/fshost/node-dir
// Copyright (c) 2012 Nathan Cartwright <fshost@yahoo.com> (MIT)

var fs = require('fs')
var path = require('path')

function files (dir, type, cb, ignoreType) {
  var pending
  var results = {
    files: [],
    dirs: []
  }
  var done = function () {
    if (ignoreType || type === 'all') cb(null, results)
    else cb(null, results[type + 's'])
  }

  var getStatHandler = function (statPath) {
    return function (err, stat) {
      if (err) return cb(err)
      if (stat && stat.isDirectory() && stat.mode !== 17115) {
        if (type !== 'file') results.dirs.push(statPath)

        files(statPath, type, function(err, res) {
          if (err) return cb(err)
          if (type === 'all') {
            results.files = results.files.concat(res.files)
            results.dirs = results.dirs.concat(res.dirs)
          } else if (type === 'file') {
            results.files = results.files.concat(res.files)
          } else {
            results.dirs = results.dirs.concat(res.dirs)
          }
          if (!--pending) done()
        }, true)
      } else {
        if (type !== 'dir') {
          results.files.push(statPath)
        }
        // should be the last statement in statHandler
        if (!--pending) done()
      }
    }
  }

  if (typeof type !== 'string') {
    ignoreType = cb
    cb = type
    type = 'file'
  }

  if (fs.statSync(dir).mode !== 17115) {
    fs.readdir(dir, function (err, list) {
      if (err) return cb(err)
      pending = list.length
      if (!pending) return done()
      for (var file, i = 0, l = list.length; i < l; i++) {
        file = path.join(dir, list[i])
        fs.stat(file, getStatHandler(file))
      }
    })
  } else {
    return done()
  }
}

function paths (dir, combine, cb) {
  var type

  if (typeof combine === 'function') {
    cb = combine
    combine = false
  }

  files(dir, 'all', function (err, results) {
    if (err) return cb(err)
    if (combine) cb(null, results.files.concat(results.dirs))
    else cb(null, results)
  })
}

function subdirs (dir, cb) {
  files(dir, 'dir', function (err, subdirs) {
    if (err) return cb(err)
    cb(null, subdirs)
  })
}

exports.files = files
exports.paths = paths
exports.subdirs = subdirs
