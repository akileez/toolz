const isFunction = require('../lang/isFunction')

function isStamp (obj) {
  return isFunction(obj) && isFunction(obj.compose)
}

module.exports = isStamp
