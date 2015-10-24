// concept adopted from: https://github.com/lepture/editor/blob/master/src/intro.js#L343
// and Jon Schlinkert -- wordcount <https://github.com/jonschlinkert/wordcount>

var matches = require('../string/wordmatch')

function wordcount (str) {
  var n = matches(str)
  var count = 0

  if (n === null) return count

  var i = -1
  var len = n.length

  while (++i < len) {
    if (n[i].charCodeAt(0) >= 0x4E00) count += n[i].length
    else count += 1
  }

  return count
}

module.exports = wordcount
