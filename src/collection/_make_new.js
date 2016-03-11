var apply = require('../function/apply')
var slice = require('../array/slice')
var kind  = require('../lang/kind')

function makeCollectionMethod (arr, obj, str, rex) {
  return function (list) {
    var type = kind.Of(list)
    var types = {
      array    : arr,
      object   : obj,
      string   : str,
      regexp   : rex,
      defaults : noop
    }

    return types[type]
      ? apply(types[type], null, slice(arguments))
      : types.defaults()
  }
}

function noop () {}

module.exports = makeCollectionMethod
