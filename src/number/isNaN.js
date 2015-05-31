/**
 * ES6 Number.isNaN
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN
 */
function isNaN (value) {
  return typeof value === 'number' && value != value
}

module.exports = isNaN