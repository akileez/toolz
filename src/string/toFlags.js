var isPlainObject = require('../lang/isPlainObject')
var toArg = require('./toArg')

function toFlags (obj, keys) {
  if (!isPlainObject(obj)) throw new TypeError('toFlags expects an object')

  keys = keys || Object.keys(obj)
  return keys.map(function (key) {
    return toArg(key, obj[key])
  })
}

module.exports = toFlags
