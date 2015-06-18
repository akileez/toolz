function baseFind (collection, predicate, eachFunc, retKey) {
  var result
  eachFunc(collection, function (val, key, collection) {
    if (predicate(val, key, collection)) {
      result = retKey ? key : value
      return false
    }
  })
  return result
}

module.exports = baseFind
