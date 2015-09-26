var toFixed = require('./toFixed')

function toPercent (n, i, l) {
  return toFixed(n * 100, i, l-1) + '%'
}

module.exports = toPercent
