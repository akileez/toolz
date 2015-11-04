var Emitter  = require('../util/Emitter')
var set      = require('../object/set')
var get      = require('../object/get')
var has      = require('../object/has')
var visit    = require('../object/visit')
var isOr     = require('../lang/yoda').or
var kindOf   = require('../lang/kindOf')
var toFlags  = require('../string/toFlags')

function App () {
  Emitter.call(this)
  this.cache = {}
  this.options = this.cache.options = {}
}

Emitter(App.prototype)

App.prototype.set       = setter
App.prototype.get       = getter
App.prototype.has       = hasit
App.prototype.del       = removeit
App.prototype.option    = option
App.prototype.enable    = enable
App.prototype.disable   = disable
App.prototype.isEnabled = enabled
App.prototype.isDisabled = disabled
App.prototype.isTrue    = isTrue
App.prototype.isFalse   = isFalse
App.prototype.isBoolean = isBoolean
App.prototype.hasOption = hasOption
App.prototype.flags     = flags
App.prototype.vis       = visitor

// sets 'value' to 'key' of the cache
function setter (key, value) {
  if (arguments.length === 1 && typeof key === 'object') this.vis('set', key, value)
  else set(this.cache, key, value)
  this.emit('set', key, value)
  return this
}

// gets the cached value for 'key' or entire cache
function getter (key) {
  return key ? get(this.cache, key) : this.cache
}

// checks if a cached value for 'key exists'
function hasit (key) {
  if (key.indexOf('.') === -1) return this.cache.hasOwnProperty(key)
  return has(this.cache, key)
}

// remove 'keys' from the cache. if no value specified, the entire cache is reset
function removeit (key) {
  this.cache = key ? delete this.cache[key] : {}
  this.emit('del', key)
  return this
}

function option (key, val) {
  if (arguments.length === 1 && kindOf(key) === 'string') {
    if (key.indexOf('.') === -1) return this.options[key]

    return get(this.options, key)
  }

  if (isOr(kindOf(key), 'object', 'array')) {
    return this.vis('option', [].slice.call(arguments))
  }

  set(this.options, key, val)
  this.emit('option', key, val)
  return this
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

function visitor (method, target) {
  visit(this, method, target)
  return this
}

module.exports = App
