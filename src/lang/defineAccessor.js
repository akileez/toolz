var isAccessor = require('./isDescriptorAccessor')

function defineAccessorProperty (obj, prop, config, enumerable, getter, setter) {
  if (isAccessor(config)) return Object.defineProperty(obj, prop, config)

  return Object.defineProperty(obj, prop, {
    configurable: config || false,
    enumerable: enumerable || false,
    get: getter,
    set: setter
  })
}

module.exports = defineAccesoorProperty