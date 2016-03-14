// unordered-array-remove <https://github.com/mafintosh/unordered-array-remove>
// Copyright (c) 2015 Mathias Buus (MIT)

function remove (arr, i) {
  if (i >= arr.length) return

  var last = arr.pop()

  if (i < arr.length) {
    var tmp = arr[i]
    arr[i] = last
    return tmp
  }

  return last
}

module.exports = remove
