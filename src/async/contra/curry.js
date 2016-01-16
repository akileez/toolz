'use strict';

var slice = require('../../array/slice');
var apply = require('../../function/apply')

module.exports = function curry () {
  var args = slice(arguments)
  var method = args.shift()

  return function curried () {
    var more = slice(arguments)
    apply(method, method, args.concat(more))
  }
}
