// Calculate the divisor and modulus of two integers

var isInteger = require('../number/isInteger')

function divMod (a, b) {
  if (b <= 0) {
    throw new Error('b cannot be zero. Undefined')
  }

  if (!isInteger(a) || !isInteger(b)) {
    throw new Error('A or B are not integers')
  }

  return [Math.floor(a / b), a % b]
}

module.exports = divMod
