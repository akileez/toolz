// specialized version of `prop` which supports deep paths

var get = require('../object/get')

function deepProp (path) {
  return function (obj) {
    return get(obj, path)
  }
}

module.exports = deepProp
