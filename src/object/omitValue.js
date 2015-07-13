var isObject = require('../lang/isObject')
var omit = require('./omit')
var get = require('./get')
var set = require('./set')

// Copyright (c) 2015, Jon Schlinkert. <https://github.com/jonschlinkert/omit-value> (MIT)

function omitValue (obj, prop, keys) {
  if (!isObject(obj)) throw new TypeError('omitValue expects first arg to be an object.')
  if (typeof prop !== 'string') throw new TypeError('omitValue expects prop to be a string')
  if (typeof keys === undefined) return omit(obj, prop)

  var val = get(obj, prop)
  set(obj, prop, omit(val, keys))
  return obj
}

module.exports = omitValue