var mapDelete = require('./mapDelete')
var mapGet = require('./mapGet')
var mapHas = require('./mapHas')
var mapSet = require('./mapSet')

// creates a cache object to store key/value pairs

function MapCache () {
  this.__data__ = {}
}

// add functions to the 'Map' cache
MapCache.prototype['delete'] = mapDelete
MapCache.prototype.get = mapGet
MapCache.prototype.has = mapHas
MapCache.prototype.set = mapSet

module.exports = MapCache
