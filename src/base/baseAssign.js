var baseCopy = require('./baseCopy')
var keys = require('../object/keys')

function baseAssign (obj, src) {
  return src == null
    ? obj
    : baseCopy(src, keys(src), obj)
}

module.exports = baseAssign