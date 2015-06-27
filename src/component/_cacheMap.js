// lodash internal -- see ../base/MapCache.js for different format

var hasOwn =  Object.prototype.hasOwnProperty;

function MapCache () {
  this.__data__ = {}
}

// sets 'value' to 'key' of the cache
MapCache.prototype.set = function (key, value) {
  if (key != '__proto__') this.__data__[key] = value
  return this
}

// gets the cached value for 'key'
MapCache.prototype.get = function (key) {
  return key == '__proto__' ? undefined : this.__data__[key]
}

// checks if a cached value for 'key exists'
MapCache.prototype.has = function (key) {
  return key != '__proto__' && hasOwn(this.__data__, key)
}

// removes 'key and its value from the cache'
MapCache.prototype.del = function (key) {
  return this.has(key) && delete this.__data__[key]
}

module.exports = MapCache
