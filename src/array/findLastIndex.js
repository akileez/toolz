// Loops through the items in the Array on the reverse order and returns
// the index of the first one that passes a truth test (callback).

function findLastIndex (arr, fn) {
  if (arr == null) return -1

  var len = arr.length

  while (--len >= 0) {
    if (fn(arr[len], len, arr)) return len
  }
  return -1
}

module.exports = findLastIndex
