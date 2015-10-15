var kindOf = require('../lang/kindOf')

function makeCollectionMethod (arr, obj, str, rex, def) {
  return function (list) {
    switch (kindOf(list)) {
      case 'array': return arr.apply(null, arguments)
      case 'object': return obj.apply(null, arguments)
      case 'string': return str.apply(null, arguments)
      case 'regexp': return rex.apply(null, arguments)
      default: return def
    }
  }
}

module.exports = makeCollectionMethod
