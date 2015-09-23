// adopted from: https://github.com/lepture/editor/blob/master/src/intro.js#L343
// inspired by: Jon Schlinkert -- wordcount <https://github.com/jonschlinkert/wordcount>
// enhanced by: Charlike Mike Reagent adding cyrillic: \u0400-\u04FF - to the end of groups

function countWords (data) {
  var pattern = /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/g
  var m = data.match(pattern)

  var count = 0

  if (m === null) return count

  var i = -1
  var len = m.length

  while (++i < len) {
    if (m[i].charCodeAt(0) >= 0x4E00) count += m[i].length
    else count += 1
  }

  return count
}

module.exports = countWords
