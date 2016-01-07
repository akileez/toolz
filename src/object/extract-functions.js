var isFunction = require('../lang/isFunction')
var forEach    = require('../collection/forEach')
var slice      = require('../array/slice')

function extractFunctions (args) {
  args = slice(arguments)
  // console.log('argument extraction of fuctions: ', args)
  var result = []

  if (isFunction(args[0])) {
    forEach(args, function (fn) {
      if (isFunction(fn)) result.push(fn)
    })
  } else if (args.length > 0) {
    forEach(args, function (obj) {
      forEach(obj, function (fn) {
        if (isFunction(fn)) result.push(fn)
      })
    })
  } else {
    return undefined
  }
  return result.length === 0 ? undefined : result
}

module.exports = extractFunctions
