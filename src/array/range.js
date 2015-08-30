// not actually used. mout.js
// var countSteps = require('../math/countSteps')

// returns an Array of numbers inside range

function range (start, stop, step) {
  if (stop == null) {
    stop = start
    start = 0
  }
  step = step || 1
  var result = []
  // var nSteps = countSteps(stop - start, step)
  var i = start

  while (i <= stop) {
    result.push(i)
    i += step
  }
  return result
}

module.exports = range
