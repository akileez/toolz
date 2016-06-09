var isFinite = require('./isFinite')

function isFloat (num) {
  return isFinite(num) && num !== (num | 0)
}

module.exports = isFloat
