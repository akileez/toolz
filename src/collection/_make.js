var isInteger = require('../lang/isInteger')

function makeCollectionMethod (arr, obj, str, rex, def) {
  if (arguments.length === 2) {
    return function (list) {
      return (isInteger(list.length))
      ? arr.apply(null, arguments)
      : obj.apply(null, arguments)
    }
  }

  return function (list) {
    // this will be an excellent use of the spread operator.
    // will be able to get rid of apply
    if (list == null) return def
    if (typeof list === 'string') return str.apply(null, arguments)
    if (list instanceof RegExp) return rex.apply(null, arguments)

    return (isInteger(list.length))
      ? arr.apply(null, arguments)
      : obj.apply(null, arguments)
  }
}

module.exports = makeCollectionMethod
