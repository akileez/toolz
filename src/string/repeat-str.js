var toString = require('../lang/toString')
// underscore.string strRepeat

function strRepeat (str, n) {
  if (n < 1) return ''

  str = toString(str)
  var res = ''

  while (n > 0) {
    if (n & 1) res += str
    n >>= 1
    str += str
  }

  return res
}

module.exports = strRepeat
