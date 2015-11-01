// return new object with properties and or values removed.
// Like omit but more precise. Ability to use dot notation for
// the property (path)

var isObject = require('../lang/isPlainObject')
var isString = require('../lang/isString')
var extend   = require('./extend')
var omit     = require('./omit')
var get      = require('./get')
var set      = require('./set')
var assert   = require('assert')

function exclude (obj, prop, keys) {
  assert(isObject(obj), 'exclude expects first arg to be an object.')
  assert(isString(prop), 'exclude expects prop to be a string')

  if (typeof keys === 'undefined') return omit(obj, prop)

  var res = extend({}, obj)
  var val = get(res, prop)
  set(res, prop, omit(val, keys))
  return res
}

module.exports = exclude
