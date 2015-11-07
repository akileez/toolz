var MAX_SAFE_INT = require('../number/MAX_SAFE_INT')

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on [`ToLength`](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength).
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */

function isLength (value) {
  return typeof value === 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INT
}

module.exports = isLength
