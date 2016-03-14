// uniq <https://github.com/mikolalysenko/uniq>
// Copyright (c) 2013 Mikola Lysenko (MIT)

'use strict'

/*

  Removes all duplicates from a sorted array in place.
    - array is the array to remove items from
    - compare is an optional comparison function that returns 0 when two items are equal, and something non-zero when they are different. If unspecified, then the default equals will be used.
    - sorted if true, then assume array is already sorted

  This library updates the array in place without making an extra copy (and so it is faster for large arrays)
  It also accepts a custom comparison function so you can remove duplicates from arrays containing object

*/

function unique (list, compare, sorted) {
  if (list == null || list.length === 0) return []

  if (compare && typeof compare === 'function') {
    if (!sorted) list.sort(compare)
    return unique_pred(list, compare)
  }

  if (!sorted) list.sort()
  return unique_eq(list)
}

function unique_pred (list, compare) {
  var ptr = 1
  var len = list.length
  var a = list[0]
  var b = list[0]

  for (var i = 1; i < len; ++i) {
    b = a
    a = list[i]

    if (compare(a, b)) {
      /* istanbul ignore if  */
      if (i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }

  list.length = ptr
  return list
}

function unique_eq (list) {
  var ptr = 1
  var len = list.length
  var a = list[0]
  var b = list[0]

  for (var i = 1; i < len; ++i) {
    b = a
    a = list[i]

    if (a !== b) {
      /* istanbul ignore if  */
      if (i === ptr) {
        ptr++
        continue
      }
      list[ptr++] = a
    }
  }

  list.length = ptr
  return list
}

module.exports = unique
