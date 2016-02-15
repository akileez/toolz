// adopted from: https://github.com/jonschlinkert/class-utils
// Copyright © 2016 Jon Schlinkert Released under the MIT license

var util     = require('util')
var define   = require('../object/defineProp')
var isObj    = require('./isObject')
var convert  = require('../array/convert')
var noop     = require('../function/noop')
var identity = require('../function/identity')

// Utils for working with JavaScript classes and prototype methods.

function isObject (val) {
  return isObj(val) || typeof val === 'function'
}

function has (obj, val) {
  val = convert(val)
  var len = val.length
  var key

  if (isObject(obj)) {
    for (key in obj) {
      if (val.indexOf(key) > -1) return true
    }

    var keys = nativeKeys(obj)
    return has(keys, val)
  }

  if (Array.isArray(obj)) {
    var arr = obj
    while (len--) {
      if (arr.indexOf(val[len]) > -1) return true
    }

    return false
  }

  throw new TypeError('expected an array or object')
}

function hasAll (val, values) {
  values = convert(values)
  var len = values.length

  while (len--) {
    if (!has(val, values[len])) return false
  }

  return true
}

function hasConstructor (val) {
  return isObject(val) && typeof val.constructor !== 'undefined'
}

function nativeKeys (val) {
  if (!hasConstructor(val)) return []
  return Object.getOwnPropertyNames(val)
}

function getDescriptor (obj, key) {
  if (!isObject(obj)) throw new TypeError('expected an object')
  if (typeof key !== 'string') throw new TypeError('expected key to be a string')

  return Object.getOwnPropertyDescriptor(obj, key)
}

function copyDescriptor (receiver, provider, name) {
  if (!isObject(receiver)) tErr('expected receiving object to be an object.')
  if (!isObject(provider)) tErr('expected providing object to be an object.')
  if (typeof name !== 'string') tErr('expected name to be a string.')

  var val = getDescriptor(provider, name)
  if (val) Object.defineProperty(receiver, name, val)
}

function copy (receiver, provider, omit) {
  var props = Object.getOwnPropertyNames(provider)
  var keys = Object.keys(provider)
  var len = props.length
  var key

  omit = convert(omit)

  while (len--) {
    key = props[len]
    if (has(keys, key)) define(receiver, key, provider[key])
    else if (!(key in receiver) && !has(omit, key)) copyDescriptor(receiver, provider, key)
  }
}

function inherit (receiver, provider, omit) {
  var keys = []
  var key

  for (key in provider) {
    keys.push(key)
    receiver[key] = provider[key]
  }

  keys = keys.concat(convert(omit))

  var a = provider.prototype || provider
  var b = receiver.prototype || receiver

  copy(b, a, keys)
}

function extend (Parent, extension) {
  if (typeof Parent !== 'function') throw new TypeError('expected Parent to be a function.')

  return function (Ctor, proto) {
    if (typeof Ctor !== 'function') throw new TypeError('expected Ctor to be a function.')
    util.inherits(Ctor, Parent)

    for (var key in Parent) Ctor[key] = Parent[key]

    if (typeof proto === 'object') {
      var obj = Object.create(proto)

      for (var k in obj) Ctor.prototype[k] = obj[k]
    }

    if (typeof extension === 'function') {
      extension(Ctor, Parent)
    }

    Ctor.extend = extend(Ctor, extension)
  }
}

function tErr (str) {
  throw new TypeError(str)
}

module.exports = {
  isObject: isObject,
  has: has,
  hasAll: hasAll,
  arrayify: convert,
  noop: noop,
  identity: identity,
  hasConstructor: hasConstructor,
  nativeKeys: nativeKeys,
  getDescriptor: getDescriptor,
  copyDescriptor: copyDescriptor,
  copy: copy,
  inherit: inherit,
  extend: extend
}
