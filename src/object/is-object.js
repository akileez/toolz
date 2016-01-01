function isObject (value) {
  return !!value && (typeof value === 'object' || typeof value === 'function')
}

module.exports = isObject
