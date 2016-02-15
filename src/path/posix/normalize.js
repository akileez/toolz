'use strict'

var isAbsolute     = require('./is-absolute')
var normalizeArray = require('./_normalize-array')

module.exports = function (path) {
  var isAbs = isAbsolute(path)
  var trailingSlash = path[path.length - 1] === '/'
  var segments = path.split('/')
  var nonEmptySegments = []
  var i

  // Normalize the path
  for (i = 0; i < segments.length; i++) {
    if (segments[i]) nonEmptySegments.push(segments[i])
  }

  path = normalizeArray(nonEmptySegments, !isAbs).join('/')

  if (!path && !isAbs) {
    path = '.'
  }

  if (path && trailingSlash) {
    path += '/'
  }

  return (isAbs ? '/' : '') + path
}
