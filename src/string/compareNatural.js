// underscore.string naturalCmp.js

function naturalCompare (str1, str2) {
  if (str1 == str2) return 0
  if (!str1) return -1
  if (!str2) return 1

  var cmpRegex = /(\.\d+|\d+|\D+)/g
  var token1 = String(str1).match(cmpRegex)
  var token2 = String(str2).match(cmpRegex)
  var count = Math.min(token1.length, token2.length)
  var i = -1

  while (++i < count) {
    var a = token1[i]
    var b = token2[i]
    if (a !== b) {
      var num1 = +a
      var num2 = +b
      if (num1 === num1 && num2 === num2) return num1 > num2 ? 1 : -1

      return a < b ? -1 : 1
    }
  }
  if (token1.length !== token2.length) return (token1.length - token2.length)

  return str1 < str2 ? -1 : 1
}

module.exports = naturalCompare
