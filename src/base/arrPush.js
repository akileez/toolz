// appends the elements of "values" to "array"

function arrPush (arr, values) {
  var idx = -1
  var len = values.length
  var offset = arr.length

  while (++idx < len) {
    arr[offset + idx] = values[idx]
  }
  return arr
}

module.exports = arrPush
