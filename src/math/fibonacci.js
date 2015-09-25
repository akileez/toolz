// Adapted from: http://bosker.wordpress.com/2011/04/29/the-worst-algorithm-in-the-world/
// Adopted from: http://github.com/sjkaliski/numbers.js

function fibonacci (n) {
  if (n > 1476)
    throw new Error('javascript will return Infinity for any number above 1476')

  function bitSystem (n) {
    var bit
    var bits = []

    while (n > 0) {
      bit = (n < 2) ? n : n % 2
      n = Math.floor(n / 2)
      bits.push(bit)
    }

    return bits.reverse()
  }

  var a = 1
  var b = 0
  var c = 1
  var i = -1
  var system = bitSystem(n)
  var len = system.length
  var temp

  while (++i < len) {
    var bit = system[i]
    if (bit) {
      temp = [(a + c) * b, (b * b) + (c * c)]
      a = temp[0]
      b = temp[1]
    } else {
      temp = [(a * a) + (b * b), (a + c) * b]
      a = temp[0]
      b = temp[1]
    }

    c = a + b
  }

  return b
}

module.exports = fibonacci
