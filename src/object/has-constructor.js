var isObject = require('./is-object')

function hasConstructor (val) {
  return isObject(val) && typeof val.constructor !== 'undefined'
}

module.exports = hasConstructor
