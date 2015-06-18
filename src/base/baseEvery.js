var baseEach = require('./baseEach')

function baseEvery (collection, predicate) {
  var result = true
  baseEach(collection, function (val, idx, collection) {
    result = !!predicate(val, idx, collection)
    return result
  })
  return result
}

module.exports = baseEvery
