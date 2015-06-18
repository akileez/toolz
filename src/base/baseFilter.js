var baseEach = require('./baseEach')

function baseFilter (collection, predicate) {
  var result = []
  baseEach(collection, function (val, idx, collection) {
    if (predicate(val, idx, collection)) {
      result.push(val)
    }
  })
  return result
}

module.exports = baseFilter
