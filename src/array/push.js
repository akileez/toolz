var slice = require('./sliced')

function push (arr /*, list of items */) {
  var items = slice(arguments, 1)

  var i = -1
  var len1 = arr.length
  var len2 = items.length

  while (++i < len2) {
    arr[len1 + i] = items[i]
  }

  return arr
}

module.exports = push