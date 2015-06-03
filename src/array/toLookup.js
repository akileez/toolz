var isFunction = require('../lang/isFunction')

// creates an object that holds a lookup for the objects in the array

function toLookup (arr, key) {
  var result = {}
  if (arr == null) return result

  var i = -1
  var len = arr.length
  var value

  if (isFunction(key)) {
    while (++i < len) {
      value = arr[i]
      result[key(value)] = value
    }
  } else {
    while (++i < len) {
      value = arr[i]
      result[value[key]] = value
    }
  }
  return result
}

module.exports = toLookup
