var slice = require('../array/slice')
var every = require('../array/every')
var some = require('../array/some')

function and (ans) {
  var args = slice(arguments, 1)
  return every(args, function (question) {
    return (ans === question)
  })
}

function not (ans) {
  var args = slice(arguments, 1)
  return every(args, function (question) {
    return (ans !== question)
  })
}

function or (ans) {
  var args = slice(arguments, 1)
  return some(args, function (question) {
    return (ans === question)
  })
}

// confirms if `who` exists and is of `what` type
// var str = 'hello'
// yoda.id('string', str) --> true
function id (what, who) {
  return (who && typeof who === what)
}

// confirms if `who` exists and is not of `what` type
// var str = true
// yoda.isnt('string', str) --> true
function isNot (what, who) {
  return (who && typeof who !== what)
}

// checks if a collection of arrays are empty
// var arr1 = [], arr2 = [], arr3 = [], arr4 = []
// yoda.empty(arr1, arr2, arr3, arr4) --> true
function isEmpty () {
  var args = slice(arguments)
  return every(args, function (val) {
    return !val.length
  })
}

exports.and = and
exports.not = not
exports.or = or
exports.id = id
exports.is = id
exports.isnt = isNot
exports.empty = isEmpty
