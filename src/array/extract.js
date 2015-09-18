// Removes items from `array` which satisfy the query. Modifies the input array, returns the extracted

var testval = require('../lang/testval')

function extract (arr, query) {
  var result = []
  var toSplice = []

  arr.forEach(function (item, idx) {
    if (testval(item, query)) {
      result.push(item)
      toSplice.push(idx)
    }
  })

  var i = -1
  var len = toSplice.length

  while (++i < len) {
    arr.splice(toSplice[i] - i, 1)
  }

  return result
}

module.exports = extract
