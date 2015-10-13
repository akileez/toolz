var slice = require('../array/sliced')
var every = require('../array/every')
var some = require('../array/some')

function and (ans) {
  var args = slice(arguments, 1)
  return every(args, function (question) {
    return question === ans
  })
}

function or (ans) {
  var args = slice(arguments, 1)
  return some(args, function (question) {
    return question === ans
  })
}

exports.and = and
exports.or = or
