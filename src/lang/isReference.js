// checks if the object is not a primitive
var isPrimitive = require('./isPrimitive')

function isReference (value) {
  return !isPrimitive(value)
}

module.exports = isReference
