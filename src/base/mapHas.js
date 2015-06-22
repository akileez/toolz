var hasOwn = require('../object/hasOwn')

// checks if a cached value for 'key exists'

function mapHas (key) {
  return key != '__proto__' && hasOwn(this.__data__, key)
}

module.exports = mapHas
