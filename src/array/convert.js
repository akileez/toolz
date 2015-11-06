// handles arrays, primitives and some object types
// use `toArray` handle array-like objects

var toArray = require('../lang/toArray')

function convert (value) {
  if (value == null) return []
  if (Array.isArray(value)) return value
  return [value]
}

module.exports = convert
module.exports.toArray = toArray
