var isNaN = require('../number/isNaN')

function codePointAt (str, pos) {
  if (str == null) throw TypeError()

  str = String(str)
  var size = str.length
  var i = pos ? Number(pos) : 0

  if (isNaN(i)) i = 0
  if (i < 0 || i >= size) return undefined

  var first = str.charCodeAt(i)

  if (first >= 0xD800 && first <= 0xDBFF && size > i + 1) {
    var second = str.charCodeAt(i + 1)
    if (second >= 0xDC00 && second <= 0xDFFF) {
      return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000
    }
  }

  return first
}

module.exports = codePointAt