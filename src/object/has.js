var get = require('./get')
var UNDEF

function has (obj, prop) {
  return get(obj, prop) !== UNDEF
}

module.exports = has
