var get = require('./get')

function result (obj, prop) {
  var property = get(obj, prop)
  if (property === undefined) return

  return typeof property === 'function'
    ? property.call(obj)
    : property
}

module.exports = result
