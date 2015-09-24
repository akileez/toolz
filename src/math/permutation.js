// Calculate the permutation (n choose k)

var binomial = require('./binomial')
var factorial = require('./factorial')

function permutation (n, k) {
  if (n <= 0) throw new Error('n cannot be less than or equal to 0')
  if (n < k) throw new Error('k cannot be greater than n')

  var binome = binomial(n, k)
  var permute = binome * factorial(k)

  return permute
}

module.exports = permutation
