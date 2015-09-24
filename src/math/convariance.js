// Evaluate the covariance amongst 2 sets

var sum = require('./add')
var scrub = require('./scrub')

function covariance (set1, set2) {
  set1 = scrub(set1)
  set2 = scrub(set2)

  if (set1.length === set2.length) {
    var i = -1
    var n = set1.length
    var total = 0
    var sum1 = sum(set1)
    var sum2 = sum(set2)

    while (++i < n) {
      total += set1[i] * set2[i]
    }

    return (total - sum1 * sum2 / n) / n
  } else {
    throw new Error('Array mismatch')
  }
}

module.exports = covariance
