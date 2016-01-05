// specialized version of `prop` which supports deep paths
// including `prop` to make comprehensive

var get = require('../object/get')

function prop (name) {
  return function (obj) {
    return obj[name]
  }
}

function deepProps (path) {
  return function (obj) {
    return get(obj, path)
  }
}

module.exports = deepProps
module.exports.shallow = prop