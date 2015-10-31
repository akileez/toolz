// adopted from: to-object-path <>
//

var isArguments = require('../lang/isArguments')
var flatten     = require('../array/flatten')
var slice       = require('../array/slice')

function topath (args) {
  if (isArguments(args)) args = slice(args)
  else args = slice(arguments)

  return flatten(args).join('.')
}

module.exports = topath
