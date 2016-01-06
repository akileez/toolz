// adopted from: https://github.com/substack/node-concat-map
// MIT license

function concatMap (arr, fn) {
  var res = []
  var i = -1
  var len = arr.length

  while (++i < len) {
    var result = fn(arr[i], i)
    if (Array.isArray(result)) res.push.apply(res, result)
    else res.push(result)
  }

  return res
}

module.exports = concatMap
