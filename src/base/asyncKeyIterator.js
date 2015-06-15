var isArrayLike = require('../lang/isArrayLike')
var _keys = require('./asyncKeys')

function _keyIterator(coll) {
  var i = -1
  var len
  var keys
  if (isArrayLike(coll)) {
    len = coll.length
    return function next () {
      i++
      return i < len ? i : null
    }
  } else {
    keys = _keys(coll)
    len = keys.length
    return function next () {
      i++
      return i < len ? keys[i] : null
    }
  }
}

module.exports = _keyIterator
