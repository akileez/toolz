// adopted from: <https://github.com/jonschlinkert/omit-value>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var isObject = require('../lang/isPlainObject')
var isString = require('../lang/isString')
var extend   = require('./extend')
var omit     = require('./omit')
var get      = require('./get')
var set      = require('./set')
var assert   = require('assert')

function omitValue (obj, prop, keys) {
  assert(isObject(obj), 'omitValue expects first arg to be an object.')
  assert(isString(prop), 'omitValue expects prop to be a string')

  if (typeof keys === 'undefined') return omit(obj, prop)

  var res = extend({}, obj)
  var val = get(res, prop)
  set(res, prop, omit(val, keys))
  return res
}

module.exports = omitValue
