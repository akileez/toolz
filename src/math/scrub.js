// removes all non essential items from an array for statistical anaylsis
// ensures the array length is equal to the number of items
// being used in calculations

var isNumber = require('../number/isFinite')
var filter = require('../array/filter')
var assert = require('assert')

function scrub (arr) {
  assert(Array.isArray(arr), 'math/scrub.js Expects an array')
  return filter(arr, isNumber)
}

module.exports = scrub
