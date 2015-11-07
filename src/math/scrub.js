// removes all non essential items from an array for statistical anaylsis
// ensures the array length is equal to the number of items
// being used in calculations

var isNumber = require('../number/isFinite')
var filter = require('../array/filter')

function scrub (arr) {
  if (!Array.isArray(arr)) throw new Error('math/scrub.js Expects an array')

  return filter(arr, function (value) {
    return isNumber(value)
  })
}

module.exports = scrub
