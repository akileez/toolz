var add = require('./add')

function mean (arr) {
  var count = arr.length
  var sum = add(arr)
  return sum / count
}

module.exports = mean
