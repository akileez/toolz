// removes 'key and its value from the cache'

function mapDelete (key) {
  return this.has(key) && delete this.__data__[key]
}

module.exports = mapDelete
