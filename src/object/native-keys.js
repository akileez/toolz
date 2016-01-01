var hasConstructor = require('./has-constructor')

function nativeKeys (val) {
  if (!hasConstructor(val)) return []
  return Object.getOwnPropertyNames(val)
}

module.exports = nativeKeys
