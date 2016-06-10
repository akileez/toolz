var yoda = require('../lang/yoda').nor

// checks if value is inside the range

function inRange (val, min, max, theshold) {
  if (max === undefined) {
    max = min
    min = 0
  }

  if (yoda('number', typeof val, typeof min, typeof max)) {
    throw new TypeError('Expected all arguments to be numbers')
  }

  theshold = theshold || 0
  return (val + theshold >= min && val - theshold <= max)
}

module.exports = inRange
