var apply = require('../function/apply')
var noop  = require('../function/noop')
var kind  = require('../lang/kind')

function makeCollectionMethod (arr, obj, str, rex, def) {
  return function (list) {
    // console.log('----------------------the list(new)-----------------------')
    // console.log(kind.safe(list))
    var type = kind(list)
    var types = {
      array    : arr,
      object   : obj,
      string   : str,
      regexp   : rex,
      defaults : noop
    }

    return types[type]
      ? apply(types[type], null, arguments)
      : types.defaults()
  }
}

module.exports = makeCollectionMethod
