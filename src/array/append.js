function append (arr1, arr2) {
  if (arr2 == null) return arr1

  var len1 = arr1.length
  var len2 = arr2.length
  var i = -1

  while (++i < len2) {
    arr1[len1 + i] = arr2[i]
  }
  return arr1
}

module.exports = append
