function defineDataProperty (obj, prop, config, enumerable, write, val) {
  if (typeof config === 'object') {
    return Object.defineProperty(obj, prop, config)
  }

  return Object.defineProperty(obj, prop, {
    configurable: config || false,
    enumerable: enumerable || false,
    writable: write || false,
    value: val
  })
}

module.exports = defineDataProperty
