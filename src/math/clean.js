// removes all non essential items from an array for statistical anaylsis
// ensures the array length is correct when doing calculations

var isNumber = require('../number/isNumber')

function clean (arr) {
  if (!Array.isArray(arr)) throw new Error('math/clean.js Expects an array')

  return arr.filter(function (value) {
    return isNumber(value) && (value != null)
  })
}

module.exports = clean
