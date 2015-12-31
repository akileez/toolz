// adopted from: define-property <https://github.com/jonschlinkert/define-property>
// Copyright (c) 2015, Jon Schlinkert (MIT)

var isDescriptor = require('./isDescriptor')

function defineProperty (obj, prop, val) {
  if (isDescriptor(val) && ('set' in val || 'get' in val))
    return Object.defineProperty(obj, prop, val)

  return Object.defineProperty(obj, prop, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  })
}

module.exports = defineProperty
