var Emitter  = require('../util/Emitter')
var set      = require('../object/set')
var get      = require('../object/get')
var has      = require('../object/has')
var omit     = require('../object/omit')

function MapCache () {
  Emitter.call(this)
  this.cache = {}
}

Emitter(MapCache.prototype)

MapCache.prototype.set = setter
MapCache.prototype.get = getter
MapCache.prototype.has = hasit
MapCache.prototype.del = removeit

// sets 'value' to 'key' of the cache
function setter (key, value) {
  set(this.cache, key, value)
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
  this.cache = keys ? omit(this.cache, keys) : {}
  this.emit('del', keys)
  return this
}

module.exports = MapCache
