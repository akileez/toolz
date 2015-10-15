// Deep query an array but only returns the first item found
// this differs from array/find where the qurey item
// can be a string, regex, array, plain object, number

var where = require('./where')

function findFirst (arr, query) {
  return where(arr, query)[0]
}

module.exports = findFirst
