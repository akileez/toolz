// Groups the elements of each array at their corresponding indexes.
// Useful for separate data sources that are coordinated through
// matching array indexes. For a matrix of nested arrays,
// zip.apply(...) can transpose the matrix in a similar fashion.

var max = require('./max')
var map = require('./map')

function getLength (arr) {
  return arr == null ? 0 : arr.length
}

// merges together the values of each of the arrays with
// the values at the corresponding position

function zip (arr) {
  var len = arr ? max(map(arguments, getLength)) : 0
  var results = []
  var i = -1

  while (++i < len) {
    results.push(map(arguments, function (item) {
      return item == null ? undefined : item[i]
    }))
  }

  return results
}

module.exports = zip
