function append (arr1, arr2) {
  if (arr2 == null) return arr1
  var len1 = arr1.length
  var len2 = arr2.length
  var iter = -1
  while (++iter < len2) {
    arr1[len1 + iter] = arr2[iter]
  }
  return arr1
}

module.exports = append