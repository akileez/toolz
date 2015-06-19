var baseEach = require('./baseEach')
var isArrayLike = require('../lang/isArrayLike')

function baseMap (collection, iteratee) {
  var idx = -1
  result = isArrayLike(collection) ? Array(collection.length) : []

  baseEach(collection, function (val, key, collection) {
    result[++idx] = iteratee(val, key, collection)
  })
  return result
}

module.exports = baseMap
