function isArray (value) {
  return Array.isArray(value) || Object.prototype.toString.call(value) === '[object Array]'
}

module.exports = isArray
