// adopted from lodash internal
// creates a new array joining arr1 with arr2

function concat (arr1, arr2) {
  var i = -1
  var j = -1

  var len1 = arr1.length
  var len2 = arr2.length

  var result = []
  result.length = len1 + len2

  while (++i < len1) {
    result[i] = arr1[i]
  }

  while (++j < len2) {
    result[i++] = arr2[j]
  }

  return result
}

module.exports = concat
