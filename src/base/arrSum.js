// a specialized version of lodash "sum" for arrays
// without support for iteratees

function arrSum (arr) {
  var len = arr.length
  var result = 0

  while (len--) {
    result += +arr[len] || 0
  }
  return result
}

module.exports = arrSum
