// adopted from: is-accessor-descriptor <https://github.com/jonschlinkert/is-accessor-descriptor>
// Copyright (c) 2015, Jon Schlinkert. (MIT)

var hasOwn = require('../object/hasOwn')
var kind   = require('../lang/kind')

function isAccessorDescriptor (obj, prop) {
  if (kind.safe(obj) !== 'object') return false

  if (typeof prop === 'string') {
    var val = Object.getOwnPropertyDescriptor(obj, prop)

    if (hasOwn(val, 'value') || hasOwn(val, 'writable')) return false
    if (!hasOwn(val, 'get') || typeof val.get !== 'function') return false

    if (hasOwn(val, 'set')
      && typeof val['set'] !== 'function'
      && typeof val['set'] !== 'undefined'
    ) return false

    return typeof val !== 'undefined'
  }

  if (isDescriptorProp('configurable')
    && isDescriptorProp('enumerable')
    && isDescriptorFunc('get')
  ) return true

  return false

  function isDescriptorProp (prop) {
    return hasOwn(obj, prop) && typeof obj[prop] === 'boolean'
  }

  function isDescriptorFunc (prop) {
    return hasOwn(obj, prop) && typeof obj[prop] === 'function'
  }
}

module.exports = isAccessorDescriptor
