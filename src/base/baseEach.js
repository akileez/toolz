var baseForOwn = require('./baseForOwn')
var getLength = require('./getLength')
var isLength = require('../lang/isLength')
var toObject = require('../lang/toObject')

function baseEach (collection, iteratee) {
  var len = collection ? getLength(collection) : 0
  if (!isLength(len)) return baseForOwn(collection, iteratee)

  var idx = -1
  var iterable = toObject(collection)
  while (++idx < len) {
    if (iteratee(iterable[idx], idx, iterable) === false) break
  }
  return collection
}