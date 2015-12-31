// adopted from: is-data-descriptor <https://github.com/jonschlinkert/is-data-descriptor>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var hasOwn = require('../object/hasOwn')
var kind   = require('../lang/kind')

function isDataDescriptor (obj, prop) {
  if (kind.safe(obj) !== 'object') return false

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop)
    if (!('value' in val) && !('writable' in val)) return false

    return typeof val !== 'undefined'
  }

  // I am being anal here. I require all properties to be present
  // if only an object is being passed. this check is primarily for
  // lang/defineProp -- a wrapper for Object.defineProperty
  if (isDescriptorProp('configurable')
    && isDescriptorProp('enumerable')
    && (isDescriptorProp('writable') || hasOwn(obj, 'value'))
  ) return true

  return false

  function isDescriptorProp (prop) {
    return hasOwn(obj, prop) && typeof obj[prop] === 'boolean'
  }
}



module.exports = isDataDescriptor
