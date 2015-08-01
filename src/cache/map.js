// based from lodash internal MapCache -- see ../base/MapCache.js for lodash version.
var get     = require('../object/get')

var hasOwn =  Object.prototype.hasOwnProperty;

function MapCache () {
  this.__data__ = {}
}

MapCache.prototype.set = setter
MapCache.prototype.get = getter
MapCache.prototype.has = hasit
MapCache.prototype.del = removeit

// sets 'value' to 'key' of the cache
function setter (key, value) {
  if (key != '__proto__') this.__data__[key] = value
  return this
}

// gets the cached value for 'key' or entire cache
function getter (key) {
  return key ? get(this.__data__, key) : this.__data__
}

// checks if a cached value for 'key exists'
function hasit (key) {
  return key != '__proto__' && hasOwn.call(this.__data__, key)
}

// removes 'key and its value from the cache'
 function removeit (key) {
  return this.has(key) && delete this.__data__[key]
}

module.exports = MapCache
