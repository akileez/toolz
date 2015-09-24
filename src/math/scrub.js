// removes all non essential items from an array for statistical anaylsis
// ensures the array length is equal to the number of items
// being used in calculations

var isNumber = require('../number/isNumber')

function scrub (arr) {
  if (!Array.isArray(arr)) throw new Error('math/scrub.js Expects an array')

  return arr.filter(function (value) {
    return isNumber(value) && (value != null)
  })
}

module.exports = scrub
