var chars = require('./chars')

function splice (str, i, num, substr) {
  var arr = chars(str)
  arr.splice(~~i, ~~num, substr)
  return arr.join('')
}

module.exports = splice
