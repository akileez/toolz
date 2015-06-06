// lodash internal
// the base implementation of `_.property` without support for deep paths

function baseProperty (key) {
  return function (obj) {
    return obj == null ? undefined : obj[key]
  }
}

module.exports = baseProperty
