var isFunction = require('../lang/isFunction')
var isDescriptor = require('./is-object')

// module.exports = (obj) => isFunction(obj) && isFunction(obj.compose) && isDescriptor(obj.compose)

function isStamp (obj) {
  return isFunction(obj)
    && isFunction(obj.compose)
    && isDescriptor(obj.compose)
}

module.exports = isStamp
