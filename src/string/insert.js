var toString = require('../lang/toString')
var clamp = require('../math/clamp')

function insert (str, idx, partial) {
  str = toString(str)
  if (idx < 0) idx = str.length + idx
  idx = clamp(idx, 0, str.length)

  return str.substr(0, idx) + partial + str.substr(idx)
}

module.exports = insert
