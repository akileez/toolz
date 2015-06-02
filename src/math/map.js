var lerp = require('./lerp')
var norm = require('./norm')

// maps a number from one scale to another
// @example map(3, 0, 4, -1, 1)
// val = num under consideration
// scale 1 = min1 to max1
// scale 2 = min2 to max2
function map (val, min1, max1, min2, max2) {
  return lerp(norm(val, min1, max1), min2, max2)
}

module.exports = map
