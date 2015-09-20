var Emitter  = require('../util/Emitter')
var set      = require('../object/set')
var look     = require('../object/look')
var has      = require('../object/has')
var omit     = require('../object/omit')
var visit    = require('../object/visit')

function Cfg () {
  Emitter.call(this)
  this.cache = {}
}

Emitter(Cfg.prototype)

Cfg.prototype.set = setter
Cfg.prototype.get = getter
Cfg.prototype.has = hasit
Cfg.prototype.del = removeit
Cfg.prototype.vis = visitor

// sets 'value' to 'key' of the cache
function setter (key, value) {
  if (arguments.length === 1 && typeof key === 'object') this.vis('set', key, value)
  else set(this.cache, key, value)
  this.emit('set', key, value)
  return this
}

// gets the cached value for 'key' or entire cache
function getter (key) {
  return key ? look(this.cache, key) : this.cache
}

// checks if a cached value for 'key exists'
function hasit (key) {
  if (key.indexOf('.') === -1) return this.cache.hasOwnProperty(key)
  return has(this.cache, key)
}

// remove 'keys' from the cache. if no value specified, the entire cache is reset
function removeit (key) {
  this.cache = key ? omit(this.cache, key) : {}
  this.emit('del', key)
  return this
}

function visitor (method, target) {
  visit(this, method, target)
  return this
}

module.exports = Cfg
