function isObject (value) {
  return Object.prototype.toString.call(value) === '[object Object]'
}

module.exports = isObject
