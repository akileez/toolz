// Deep query an array but only returns the first item found

var where = require('./where')

function findFirst (arr, query) {
  return where(arr, query)[0]
}

module.exports = findFirst
