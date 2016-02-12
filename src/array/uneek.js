// uniq <https://github.com/mikolalysenko/uniq>
// Copyright (c) 2013 Mikola Lysenko (MIT)

'use strict'

function unique (list, compare, sorted) {
  if (list.length === 0) return list

  if (compare) {
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

module.exports = unique;
