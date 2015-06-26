var baseGet = require('./baseGet')
var toPath = require('../string/toPath')

function basePropertyDeep (path) {
  var pathKey = (path + '')
  path = toPath(path)
  return function (obj) {
    return baseGet(obj, path, pathKey)
  }
}

module.exports = basePropertyDeep
