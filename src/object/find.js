var some = require('./some')

function find (obj, fn) {
  var result

  some(obj, function (val, key, obj) {
    if (fn(val, key, obj)) {
      result = val
      return true // break
    }
  })
  return result
}

module.exports = find
