// Calculate the greastest common divisor amongst two integers
function gcd (a, b) {
  var c
  a = +a
  b = +b

  if (a !== a || b !== b)
    return NaN
  if (a === Infinity || a === -Infinity || b === Infinity || b === -Infinity)
    return Infinity
  if ((a % 1 !== 0) || (b % 1 !== 0))
    throw new Error('Can only operate on integers')

  while (b) {
    c = a % b
    a = b
    b = c
  }

  return (0 < a) ? a : -a
}

module.exports = gcd
