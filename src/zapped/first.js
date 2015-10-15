var filter = require('./filter')

function first (arr, num) {
  return filter(arr, function (val, key, arr) {
    return (key < (num || arr.length - 1))
  })
}

module.exports = first

/**
  This method is faster but going with above
  for education.

    var slice = require('./sliced')

    function first (arr, num) {
      return slice(arr, 0, num || -1)
    }
*/
