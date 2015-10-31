// adopted from: <https://github.com/jonschlinkert/omit-value>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var isObject = require('../lang/isPlainObject')
var isString = require('../lang/isString')
var omit     = require('./omit')
var get      = require('./get')
var set      = require('./set')
var assert   = require('assert')

function omitValue (obj, prop, keys) {
  assert(isObject(obj), 'omitValue expects first arg to be an object.')
  assert(isString(prop), 'omitValue expects prop to be a string')

  if (typeof keys === undefined) return omit(obj, prop)

  var val = get(obj, prop)
  set(obj, prop, omit(val, keys))
  return obj
}

module.exports = omitValue
