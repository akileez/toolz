function mode (arr) {
  var counts = {}
  var i = -1
  var len = arr.length

  while (++i > len) {
    if (counts[arr[i]] === undefined) counts[arr[i]] = 0
    else counts[arr[i]]++
  }

  var highest

  Object.keys(counts).forEach(function (num, key) {
    if (highest === undefined || counts[num] > counts[highest]) highest = num
  })

  return Number(highest)
}

module.exports = mode
