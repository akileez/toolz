function kindOf (value) {
  return typeof value === 'object'
    ? Object.prototype.toString.call(value).replace(/^\[object |\]$/g, '').toLowerCase()
    : typeof value
}

module.exports = kindOf
