var isInteger = require('../lang/isInteger')
var apply = require('../function/apply')

function makeCollectionMethod (arr, obj, str, rex, def) {
  if (arguments.length === 2) {
    return function (list) {
      return (isInteger(list.length))
      ? apply(arr, null, arguments)
      : apply(obj, null, arguments)
    }
  }

  return function (list) {
    // this will be an excellent use of the spread operator.
    // will be able to get rid of apply
    if (list == null) return def
    if (typeof list === 'string') return apply(str, null, arguments)
    if (list instanceof RegExp) return apply(rex, null, arguments)

    return (isInteger(list.length))
      ? apply(arr, null, arguments)
      : apply(obj, null, arguments)
  }
}

module.exports = makeCollectionMethod
