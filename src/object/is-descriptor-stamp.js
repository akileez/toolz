// stampit version_3

function isStampDescriptor (obj) {
  if (!obj) return false

  return Boolean((obj.methods
    || obj.properties
    || obj.deepProperties
    || obj.propertyDescriptors
    || obj.staticProperties
    || obj.staticDeepProperties
    || obj.staticPropertyDescriptors
    || obj.initializers
    || obj.configuration
  ) && true)
}

module.exports = isStampDescriptor
