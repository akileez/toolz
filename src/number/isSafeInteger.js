var MAX = require('./MAX_SAFE_INT')
var isFinite = require('./isFinite')

function isSafeInteger (val) {
  return isFinite(val)
    && val > -MAX
    && val < MAX
    && Math.floor(val) === val
}