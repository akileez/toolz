function repeat (item, num) {
  var arr = []
  var i = -1

  while (++i < num) arr[i] = item

  return arr
}

module.exports = repeat
