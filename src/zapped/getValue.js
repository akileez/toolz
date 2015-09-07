var baseGet = require('../base/baseGet')
var toPath = require('../string/toPath')

// gets the property value at 'path' of 'object'. If the resolved value is
// undefined the defaultValue is used in its place

function getValue (obj, path, defaultValue) {
  var result = obj == null ? undefined : baseGet(obj, toPath(path), path + '')
  return result === undefined ? defaultValue : result
}

module.exports = getValue
