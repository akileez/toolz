function hasOwn (obj, prop) {
  // trying to eliminate call where I can:
  return Object.prototype.hasOwnProperty.call(obj, prop)
  // return obj.hasOwnProperty(prop)
}

module.exports = hasOwn
