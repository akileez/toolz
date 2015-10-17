function isArray (value) {
  return Object.prototype.toString.call(value) === '[object Array]'
}

module.exports = Array.isArray || isArray
