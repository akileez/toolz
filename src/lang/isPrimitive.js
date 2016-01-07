// checks if the object is a primitive

function isPrimitive (value) {
  return value === null
    || typeof value === 'boolean'
    || typeof value === 'number'
    || typeof value === 'string'
    || typeof value === 'symbol'
    || typeof value === 'undefined'
}

function isReference (value) {
  return !isPrimitive(value)
}

module.exports = isPrimitive
module.exports.Not = isReference
