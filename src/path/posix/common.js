'use strict';

var dirname = require('./dirname')
var resolve = require('./resolve')
var normalize

normalize = function (path) {
  if (typeof path !== 'string') {
    throw new TypeError('Arguments to path.common must be strings')
  }

  var isDir = (path[path.length - 1] === '/')
  path = resolve(path)

  if (isDir) return path
  return dirname(path)
}

module.exports = function (path/*, ...pathn*/) {
  var i
  var l
  var pathLength
  var other
  var end
  var j
  var otherLength

  path = normalize(path)

  if (path === '/') return '/'

  l = arguments.length
  pathLength = path.length

  for (i = 1; i < l; ++i) {
    other = normalize(arguments[i])
    end = 0
    j = 0
    otherLength = other.length

    while (path[j] === other[j]) {
      if (path[j] === '/') end = j
      ++j

      if (pathLength === j) {
        if (otherLength === j) end = j
        else if (other[j] === '/') end = j
        break
      }

      if (otherLength === j) {
        if (path[j] === '/') end = j
        break
      }
    }

    if (end <= 1) return '/'
    if (end !== pathLength) {
      path = path.slice(0, end)
      pathLength = end
    }
  }

  return path
}
