function result (obj, prop) {
  var property = obj[prop]
  if (property === undefined) return

  return typeof property === 'function'
    ? property.call(obj)
    : property
}

module.exports = result
