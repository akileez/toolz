// gets the cached value for 'key'

function mapGet (key) {
  return key == '__proto__' ? undefined : this.__data__[key]
}

module.exports = mapGet
