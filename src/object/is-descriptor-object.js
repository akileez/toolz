var isData = require('./is-descriptor-data')
var isAccessor = require('./is-descriptor-accessor')

function isDescriptor (obj, key) {
  return isData(obj, key) || isAccessor(obj, key)
}

module.exports = isDescriptor
