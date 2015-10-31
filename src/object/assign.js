// adopted from: <https://github.com/jonschlinkert/assign-value>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var isUndefined = require('../lang/isUndefined')
var isObject    = require('../lang/isPlainObject')
var isString    = require('../lang/isString')
var kindOf      = require('../lang/kindOf')
var yoda        = require('../lang/yoda')
var extend      = require('./extend')
var get         = require('./get')
var set         = require('./set')
var assert      = require('assert')

function assignValue (obj, prop, value) {
  assert(isObject(obj), 'expected an object as first param, got ' + kindOf(obj))

  if (yoda.and('undefined', typeof prop, typeof value)) return obj

  if (isUndefined(value) && isObject(prop)) return extend(obj, prop)

  if (isString(value)) {
    set(obj, prop, value)
    return obj
  }

  var curr = get(obj, prop)
  var rest = extend({}, curr, value)
  set(obj, prop, rest)
  return obj
}

module.exports = assignValue
