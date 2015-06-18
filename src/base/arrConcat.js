// lodash internal
// creates a new array joining "array" with "other"

function arrConcat (arr, oth) {
  var idx = -1
  var len = arr.length
  var othIdx = -1
  var othLen = oth.length
  var result = Array(len + othLen)

  while (++idx < len) {
    result[idx] = arr[idx]
  }
  while (++othIdx < othLen) {
    result[idx++] = oth[othIdx]
  }
  return result
}

module.exports = arrConcat
