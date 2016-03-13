// Return true if a value exists in an array.
//  Alias to indexOf(arr, val) !== -1

function contains (arr, val) {
  arr = arr || []
  var len = arr.length
  var i = -1

  while (++i < len) {
    if (arr[i] === val) return true
  }

  return false
}

module.exports = contains
