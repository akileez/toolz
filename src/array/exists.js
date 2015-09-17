// returns a boolean indicating a matching record exists
// this differs from array/contains where the qurey item
// can be a string, regex, array, plain object, number

var testval = require('../lang/testval')

function exists (arr, query) {
  return arr.some(function (item) {
    return testval(item, query)
  })
}

module.exports = exists
