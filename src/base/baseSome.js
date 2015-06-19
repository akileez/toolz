var baseEach = require('./baseEach')

function baseSome (collection, predicate) {
  var result

  baseEach(collection, function (val, idx, collection) {
    result = predicate(val, idx, collection)
    return !result
  })
  return !!result
}

module.exports = baseSome
