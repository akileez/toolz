var isData = require('./isDescriptorData')
var isAccessor = require('./isDescriptorAccessor')

function isDescriptor (obj, key) {
  return isData(obj, key) || isAccessor(obj, key)
}

module.exports = isDescriptor
