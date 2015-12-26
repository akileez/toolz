var slice = require('../array/slice')

Function.prototype.then = function (fn) {
  var that = this
  return function () {
    return fn(that.apply(null, arguments))
  }
}

Function.prototype.curry = function (depth) {
  var curry
  if (arguments.length > 1) {
    throw new Error('One parameter expected, ' + arguments.length + ' received.')
  }

  if (typeof depth !== 'undefined' && depth < 1) {
    throw new Error('Invalid depth received (' + depth + ').')
  }

  curry = function (arity) {
    var that = this
    var args = slice(arguments, 1)

    return function () {
      var allArgs = args.concat(slice(arguments))

      return allArgs.length >= arity
        ? that.apply(this, allArgs)
        : curry.apply(that, [arity].concat(allArgs))
    }
  }

  return curry.call(this, depth || this.length)
}

Function.prototype.memo = function (func, keyGen) {
  var cache = {}
  keyGen = keyGen || function (args) {
    return JSON.stringify(args)
  }

  return function () {
    var args = slice(arguments)
    var key = keyGen(args)

    return (typeof cache[key] === 'undefined')
      ? cache[key] = func.apply(null, args)
      : cache[key]
  }
}