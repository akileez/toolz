var isInteger = require('../lang/isInteger')

function makeCollectionMethod (arrMethod, objMethod, defaultReturn) {
  return function (list) {
    if (list == null) return defaultReturn
    return (isInteger(list.length))
      ? arrMethod.apply(null, arguments)
      : objMethod.apply(null, arguments)
  }
}

module.exports = makeCollectionMethod
