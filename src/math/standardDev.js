var sum = require('./add')
var mean = require('./mean')

function standardDev (arr) {
  var count = arr.length
  var statsmean = mean(arr)
  var squaredArr = []
  var i = -1

  while (++i < count) {
    squaredArr[i] = Math.pow((arr[i] - statsmean), 2)
  }

  return Math.sqrt((1 / count) * sum(squaredArr))
}

module.exports = standardDev
