var sequence = require('../../lib/async/_seq').seq

function iterator (stack) {
  return sequence.apply(this, stack)
}

module.exports = iterator
