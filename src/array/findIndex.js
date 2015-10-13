// Loops through all the items in the Array (starting from last item)
// and returns the first one that passes a truth test (callback).

function findIndex (arr, fn) {
  if (arr == null) return -1

  var i = -1
  var len = arr.length

  while (++i < len) {
    if (fn(arr[i], i, arr)) return i
  }
  return -1
}

module.exports = findIndex
