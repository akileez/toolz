// adopted from: define-property <https://github.com/jonschlinkert/define-property>
// Copyright (c) 2015, Jon Schlinkert (MIT)

function defineProperty (receiver, key, val) {
  if (typeof val === 'object' && ('set' in val || 'get' in val))
    return Object.defineProperty(receiver, key, val)

  return Object.defineProperty(receiver, key, {
    configurable: true,
    enumerable: false,
    writable: true,
    value: val
  })
}

module.exports = defineProperty
