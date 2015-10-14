// creates an object that holds a lookup for the objects in the array

// Create an object that indexes the items in the array by a key.
// If key is a function, the key for each value in the resulting object
// will be the result of calling the function with the value as an argument.
// Otherwise key specifies the property on each value to use as the key.

var isFunction = require('../lang/isFunction')

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
