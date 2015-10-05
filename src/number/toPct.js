var toFixed = require('./toFixed')

function toPercent (num, precision, padding) {
  return toFixed(n * 100, precision, padding) + '%'
}

module.exports = toPercent
