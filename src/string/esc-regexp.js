var toString = require('../lang/toString')

function escapeRegExp (str) {
  return toString(str).replace(/\W/g, '\\$&')
}

module.exports = escapeRegExp
