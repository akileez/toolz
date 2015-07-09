// falsey <https://github.com/jonschlinkert/falsey>
// Copyright (c) 2014-2015, Jon Schlinkert. (MIT)

var kindOf = require('./kindOf')

function falsey (val, arr) {
  var defaults = ['none', 'nil']
  if (val === 'false' || val === false) return true
  if (Array.isArray(val) || kindOf(val) === 'arguments') return !val.length
  if (kindOf(val) === 'object') return !Object.keys(val).length
  if (val === '0' || val === 0) return true

  return !val || (arr || defaults).indexOf(val) !== -1
}

module.exports = falsey
