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
  return zip
}

module.exports = zip
