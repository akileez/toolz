var chars = require('./chars')

function splice (str, i, num, substr) {
  return chars(str).splice(~~i, ~~num, substr).join('')
}

module.exports = splice
