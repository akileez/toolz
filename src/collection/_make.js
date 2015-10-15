var kindOf = require('../lang/kindOf')

function makeCollectionMethod (arr, obj, str, rex, def) {
  return function (list) {
    // this will be an excellent use of the spread operator.
    // args = slice(arguments, 1)
    var test = kindOf(list)
    if (test === 'array')  return arr.apply(null, arguments)
    if (test === 'object') return obj.apply(null, arguments)
    if (test === 'string') return str.apply(null, arguments)
    if (test === 'regexp') return rex.apply(null, arguments)
    if (test == null) return def
  }
}

module.exports = makeCollectionMethod
