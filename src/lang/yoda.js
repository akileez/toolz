var slice = require('../array/sliced')

function and (ans) {
  var args = slice(arguments, 1)
  return args.every(function (question) {
    return question === ans
  })
}

function or (ans) {
  var args = slice(arguments, 1)
  return args.some(function (question) {
    return question === ans
  })
}

exports.and = and
exports.or = or
