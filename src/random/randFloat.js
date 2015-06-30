var random = require('./random')

function randFloat (min, max) {
  if (max === undefined) {
    max = min
    min = 0
  }
  return random() * (max - min) + min
}