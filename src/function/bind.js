var slice = require('../array/slice')
var apply = require('./apply')

function bind (fn, context, args) {
  var argsArr = slice(arguments, 2) // curried args
  return function () {
    return apply(fn, context, argsArr.concat(slice(arguments)))
  }
}

module.exports = bind
