var slice = require('../array/slice')
var isArguments = require('../lang/isArguments')

'use strict'

function handleArgs (argsObj) {
  var args = manageArgs(argsObj)
  var len = args.length
  var last = args[len - 1]
  var callback = null

  if (typeof last === 'function') {
    callback = last
    args = slice(args, 0, -1)
  }

  callback = callback === null ? undefined : callback

  return {
    callback: callback,
    cb: callback,
    arguments: args,
    args: args
  }
}

function manageArgs (argsObj) {
  if (isArguments(argsObj))
    throw new TypeError('manageArgs: expect only Arguments object')

  var len = argsObj.length
  var args = new Array(len)

  while (len--) {
    args[len] = argsObj[len]
  }
  return args
}

module.exports = handleArgs
