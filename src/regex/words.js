// CJK and Cyrillic regex from:
// https://github.com/lepture/editor/blob/master/src/intro.js#L343
// Charlike Mike Reagent added cyrillic: \u0400-\u04FF - to the end of groups

function words () {
  return /[a-zA-Z0-9_\u0392-\u03c9\u0400-\u04FF]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af\u0400-\u04FF]+|\w+/g
}

module.exports = words
