// underscore.string map

var stringify = require('./stringify')

function map (str, fn) {
  str = stringify(str)

  if (str.length === 0 || typeof fn !== 'function') return str

  return str.replace(/./g, fn)
}

module.exports = map
