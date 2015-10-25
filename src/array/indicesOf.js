// Returns an array of indices where item is found in the array.
// Like array/indexOf it does loop over sparse items in the array.
// The optional fromIndex parameter can limit the scope, the same way as it does in indexOf.

/*
    var items = ['lorem', 'ipsum', 'foo', 'ipsum', 'ipsum'];

    indicesOf(items, 'ipsum');
    // > [1, 3, 4]

    indicesOf(items, 'ipsum', 1);
    // > [3, 4]
 */

function indicesOf (arr, item, fromIndex) {
  var results = []
  if (arr == null) return results

  fromIndex = typeof fromIndex === 'number'
    ? fromIndex
    : 0

  var len = arr.length
  var cursor = fromIndex >= 0
    ? fromIndex
    : len + fromIndex

  while (cursor < len) {
    if (arr[cursor] === item) results.push(cursor)
    cursor++
  }
  return results
}

module.exports = indicesOf
