var MAX = require('./MAX_SAFE_INT')
var isNumber = require('./isNumber')

function isSafeInteger (val) {
  return isNumber(val)
    && val > -MAX
    && val < MAX
    && Math.floor(val) === val
}