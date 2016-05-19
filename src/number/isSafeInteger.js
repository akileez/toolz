var MAX = require('./MAX_SAFE_INT')
var isNumber = require('./isFinite')

function isSafeInteger (val) {
  return isNumber(val)
    && val > -MAX
    && val < MAX
    && Math.floor(val) === val
}