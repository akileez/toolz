var Emitter  = require('../component/Emitter')
var assign   = require('../../src/object/extend')
var omit     = require('../../src/object/omit')
var oset     = require('../../src/object/set')
var oget     = require('../../src/object/get')
var kindOf   = require('../../src/lang/kindOf')
var flatten  = require('../../src/array/flatten')
var arrunion = require('../../src/array/union')


// Initialize a new `Config`, optionally passing an object to initialize with
function Config (cache) {
  Emitter.call(this)
  this.cache = cache || {}
}

Emitter(Config.prototype)

// Static method for mixing `Config` prototype properties onto `obj`.
Config.mixin = function (receiver, provider) {
  provider = provider || this

  for (var key in provider) {
    receiver.contructor[key] = provider[key]
  }

  receiver.contructor.prototype = Object.create(provider.prototype)

  for (var prop in receiver) {
    receiver.contructor.prototype[prop] = receiver[prop]
  }

  receiver.contructor.__super__ = provider.prototype
  return receiver.contructor
}

Config.prototype.set = setter
Config.prototype.get = getter
Config.prototype.constant = constant
Config.prototype.union = union
Config.prototype.extend = extend
Config.prototype.del = del

// assign 'value' to 'key' or return the value of 'key'
function setter (key, value) {
  if (arguments.length === 1 && kindOf(key) === 'object') this.extend(key)
  else oset(this.cache, key, value)

  this.emit('set', key, value)
  return this
}

// return the stored value of 'key'.
function getter (key) {
  return key ? oget(this.cache, key) : this.cache
}

// create a constant for setting and getting values
function constant (key, value, namespace) {
  var getter
  if (typeof value !== 'function') getter = function () {return value}
  else getter = value

  namespace = namespace || 'cache'
  this[namespace] = this[namespace] || {}
  this[namespace].__defineGetter__(key, getter)
  return this
}

// add values to an array on the cache
function union (key/*, array*/) {
  if (typeof key !== 'string') throw new Error('ConfigCache#union expects `key` to be a string')

  var arr = this.get(key) || []
  var len = arguments.length - 1
  var args = new Array(len)
  var i = -1

  while (++i < len) {
    args[i] = arguments[i + 1]
  }
  this.set(key, arrunion(arr, flatten(args)))
  this.emit('union', key)
  return this
}

// extend the 'cache with the given object'
function extend () {
  var len = arguments.length
  var args = new Array(len)
  var i = -1
  while (++i < len) {
    args[i] = arguments[i]
  }
  if (typeof args[0] === 'string') {
    var obj = this.get(args[0]) || {}
    obj = assign.apply(assign, arrunion([obj], args.slice(1)))
    this.set(args[0], obj)
    this.emit('extend')
    return this
  }
  assign.apply(assign, arrunion([this.cache], args))
  this.emit('extend')
  return this
}

// remove 'keys' from the cache. if no value specified, the entire cache is reset
function del (keys) {
  this.cache = keys ? omit(this.cache, keys) : {}
  this.emit('del', keys)
  return this
}

// expose 'Config'
module.exports = Config
