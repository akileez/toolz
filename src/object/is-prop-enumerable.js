function isPropEnumerable (obj, prop) {
  return Object.prototype.propertyIsEnumerable.call(obj, prop)
}

module.exports = isPropEnumerable
