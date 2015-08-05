var Emitter  = require('../util/Emitter')
var assign   = require('../object/extend')
var omit     = require('../object/omit')
var set      = require('../object/set')
var get      = require('../object/get')
var has      = require('../object/has')
var kindOf   = require('../lang/kindOf')
var isOr     = require('../lang/isOr')
var flatten  = require('../array/flatten')
var merge    = require('../object/deepMixIn')
var arrunion = require('../array/union')
var toFlags  = require('../string/toFlags')
var objVisit = require('./visit')


// Initialize a new `Config`, optionally passing an object to initialize with
function Config (cache, options) {
  Emitter.call(this)
  this.cache = cache || {}
  this.options = this.cache.options = options || {}
}

Emitter(Config.prototype)

Config.prototype.set       = setter
Config.prototype.get       = getter
Config.prototype.constant  = constant
Config.prototype.union     = union
Config.prototype.extend    = extend
Config.prototype.del       = del
Config.prototype.option    = option
Config.prototype.enable    = enable
Config.prototype.disable   = disable
Config.prototype.enabled   = enabled
Config.prototype.disabled  = disabled
Config.prototype.isTrue    = isTrue
Config.prototype.isFalse   = isFalse
Config.prototype.isBoolean = isBoolean
Config.prototype.hasOption = hasOption
Config.prototype.flags     = flags
Config.prototype.visit     = visit

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

// assign 'value' to 'key' or return the value of 'key'
function setter (key, value) {
  if (arguments.length === 1 && kindOf(key) === 'object') this.extend(key)
  else set(this.cache, key, value)

  this.emit('set', key, value)
  return this
}

// return the stored value of 'key'.
function getter (key) {
  return key ? get(this.cache, key) : this.cache
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

function option (key, val) {
  if (arguments.length === 1 && kindOf(key) === 'string') {
    if (key.indexOf('.') === -1) return this.options[key]

    return get(this.options, key)
  }

  if (isOr(kindOf(key), 'object', 'array')) {
    return this.visit('option', [].slice.call(arguments))
  }

  set(this.options, key, val)
  this.emit('option', key, val)
  return this;
}

function enable (key) {
  return this.option(key, true)
}

function disable (key) {
  this.option(key, false)
}

function enabled (key) {
  return Boolean(this.options[key])
}

function disabled (key) {
  return !Boolean(this.options[key])
}

function isTrue (key) {
  return this.options[key] === true
}

function isFalse (key) {
  return this.options[key] === false
}

 function isBoolean (key) {
  return typeof this.options[key] === 'boolean'
}

function hasOption (key) {
  if (key.indexOf('.') === -1) return this.options.hasOwnProperty(key)
  return has(this.options, key)
}

function flags (keys) {
  keys = keys || Object.keys(this.options)
  return toFlags(this.options, keys)
}

function visit (method, target) {
  objVisit(this, method, target)
  return this
}

// expose 'Config'
module.exports = Config
