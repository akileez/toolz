function isPlainObject (value) {
  return value !== null && typeof value === "object" && value.constructor === Object
}

module.exports = isPlainObject
