var toObject = require('../lang/toObject')

function baseFor (obj, iteratee, keysFunc) {
  var iterable = toObject(obj)
  var props = keysFunc(obj)
  var len = props.length
  idx = -1

  while (++idx < len) {
    var key = props[idx]
    if (iteratee(iterable[key], key, iterable) === false) break
  }
  return obj
}

module.exports = baseFor
