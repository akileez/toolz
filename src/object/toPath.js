// adopted from: to-object-path <>
//

var isArguments = require('toolz/src/lang/isArguments')
var flatten     = require('toolz/src/array/flatten')
var slice       = require('toolz/src/array/slice')

function topath (args) {
  if (isArguments(args)) args = slice(args)
  else args = slice(arguments)

  return flatten(args).join('.')
}

module.exports = topath
