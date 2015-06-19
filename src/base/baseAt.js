var isArrayLike = require('../lang/isArrayLike')
var isIndex = require('../lang/isIndex')

// the base implementation of lodash "at" without support for string
// collections and individual key arguments

function baseAt (collection, props) {
  var idx = -1
  var isNil = collection == null
  var isArr = !isNil && isArrayLike(collection)
  var len = isArr ? collection.length : 0
  var propsLen = props.length
  var result = Array(propsLen)

  while (++idx < propsLen) {
    var key = props[idx]
    if (isArr) result[idx] = isIndex(key, len) ? collection[key] : undefined
    else result[idx] = isNil ? undefined : collection[key]
  }
  return result
}

module.exports = baseAt
