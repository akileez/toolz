var add   = require('./add')
var reset = require('./clean')

function mean (arr) {
  var sum   = add(arr)
  var count = reset(arr).length

  return sum / count
}

module.exports = mean
