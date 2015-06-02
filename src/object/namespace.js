var forEach = require('../array/forEach')

// create nested object if non-existent

function namespace (obj, path) {
  if (!path) return obj

  forEach(path.split('.'), function (key) {
    if (!obj[key]) obj[key] = {}
    obj = obj[key]
  })
  return obj
}

module.exports = namespace
