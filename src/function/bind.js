var slice = require('../array/slice')

function bind (fn, context, args) {
  var argsArr = slice(arguments, 2) // curried args
  return function () {
    return fn.apply(context, argsArr.concat(slice(arguments)))
  }
}

module.exports = bind
