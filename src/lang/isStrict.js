var isObjectLike = require('./isObjectLike')

// checks if value is suitable for strict equality comparsion, i.e., `===`
// lodash internal

function isStrictComparable (value) {
  return value === value && !isObjectLike(value)
}

module.exports = isStrictComparable
