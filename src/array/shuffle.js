var randInt = require('../random/randInt')

// shuffle array items

function shuffle (arr) {
  var results = []
  var rnd

  if (arr == null) return results

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (!i) results[0] = arr[0]
    else {
      rnd = randInt(0, 1)
      results[i] = results[rnd]
      results[rnd] = arr[i]
    }
  }
  return results
}

module.exports = shuffle
