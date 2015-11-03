// lodash internal
var getLength = require('./getLength')
var isLength = require('./isLength')

// checks if `value` is array-like
// @param {*} [value] the value to check
// @returns {Boolean} returns `true` if value is array=like else `false`

function isArrayLike (value) {
  return value != null && isLength(getLength(value))
}

module.exports = isArrayLike
