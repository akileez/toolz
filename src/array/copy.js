// make a copy of a source array

function dupe (arr) {
  var i = -1
  var len = arr.length

  var res = []
  res.length = len

  while (++i < len) {
    res[i] = arr[i]
  }

  return res
}

module.exports = dupe
