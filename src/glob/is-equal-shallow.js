// adopted from: is-equal-shallow <https://github.com/jonschlinkert/is-equal-shallow>
//
'use strict'

var isReference = require('../lang/isReference')

function isEqual (a, b) {
  if (!a && !b) return true
  if (!a && b || a && !b) return false

  var numA = 0
  var numB = 0
  var key

  for (key in b) {
    numB++
    if (isReference(b[key])
      || !a.hasOwnProperty(key)
      || (a[key] !== b[key])
    ) return false
  }

  for (key in a) {
    numA++
  }

  return numA === numB
}

module.exports = isEqual
