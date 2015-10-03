// adopted from: <https://github.com/jonschlinkert/merge-value>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var isUndef = require('../lang/isUndefined')
var isObj   = require('../lang/isObject')
var isStr   = require('../lang/isString')
var kindOf  = require('../lang/kindOf')
var yoda    = require('../lang/yoda')
var merge   = require('./merge')
var look    = require('./look')
var set     = require('./set')
var assert  = require('assert')

function mergeValue (obj, prop, val) {
  assert(isObj(obj), 'expected an object as first param, got ' + kindOf(obj))

  if (yoda.and('undefined', typeof prop, typeof val)) return obj

  if (isUndef(val) && isObj(prop)) return merge(obj, prop)

  if (isStr(val)) {
    set(obj, prop, val)
    return obj
  }

  var curr = look(obj, prop)
  var rest = merge({}, curr, val)
  set(obj, prop, rest)
  return obj
}

module.exports = mergeValue
