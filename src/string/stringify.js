function toString (value) {
  if (typeof value === 'string') return value
  return value == null ? '' : (value + '')
}

module.exports = toString
