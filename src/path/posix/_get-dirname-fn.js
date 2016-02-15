'use strict'

module.exports = function (splitPath) {
  return function (path) {
    var result = splitPath(path)
    var root = result[0]
    var dir = result[1]

    if (!root && !dir) {
      // No dirname whatsoever
      return '.'
    }

    if (dir) {
      // It has a dirname, strip trailing slash
      dir = dir.substr(0, dir.length - 1)
    }

    return root + dir
  }
}
