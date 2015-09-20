// Calculate the least common multiple amongst two integers

var gcd = require('./gcd')

function lcm (a, b) {
  return Math.abs(a * b) / gcd(a, b)
}

module.exports = lcm
