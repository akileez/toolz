// lodash.internal function

function toObject (value) {
  if (value === null || value === undefined) {
    throw new TypeError('Cannot be called with null or undefined')
  }

  return typeof value === 'object' ? value : Object(value)
}

module.exports = toObject
