function isArguments (value) {
  return Object.prototype.toString.call(value) === '[object Arguments]'
}

module.exports = isArguments
