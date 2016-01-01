var isFunction = require('../lang/isFunction')

function isComposable (obj) {
  return isFunction(obj) && isFunction(obj.compose)
}

module.exports = isComposable
