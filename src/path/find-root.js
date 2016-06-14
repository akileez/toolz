// https://github.com/jden/find-root
// Copyright © 2013 AgileMD hello@agilemd.com http://agilemd.com

var join = require('path').join
var separator = require('path').sep
var exists = require('../file/exists')

function findRoot(start) {
  start = start || module.parent.filename

  if (typeof start === 'string') {
    if (start[start.length-1] !== separator) {
      start += separator
    }

    start = start.split(separator)
  }

  if(!start.length) {
    throw new Error('package.json not found in path')
  }

  start.pop()
  var dir = start.join(separator)

  if (exists(join(dir, 'package.json'))) {
    return dir
  }

  return findRoot(start)
}

module.exports = findRoot
