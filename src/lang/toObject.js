// lodash.internal function

function toObject(value) {
  return typeof value === 'object' ? value : Object(value)
}

module.exports = toObject
