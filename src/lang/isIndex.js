var MAX_SAFE_INT = require('../number/MAX_SAFE_INT')

// used to detect unsigned integer values
var reIsUnit =  /^\d+$/

// checks if 'value' is a valid array-like index

function isIndex (val, len) {
  val = (typeof val == 'number' || reIsUnit.test(val)) ? +val : -1
  len = len == null ? MAX_SAFE_INT : len
  return val > -1 && val % 1 == 0 && val < len
}

module.exports = isIndex
