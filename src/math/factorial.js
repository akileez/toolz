function factorial (num) {
  var i = 2
  var o = 1

  while (i < num) {
    o *= i++
  }
  return o
}

module.exports = factorial
