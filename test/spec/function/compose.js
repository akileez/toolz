'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/compose')
var t = painless.assert

var compose = require('../../../src/function/compose')

test('should pass returned value to each fn in the chain starting from left-most fn', function () {
  var arr = [1, 2, 3]

  function map (arr, fn) {
    var n = arr.length
    var i = 0
    while (i < n) {
      arr[i] = fn(arr[i])
      i += 1
    }
    return arr
  }

  function add2 (val) {
    return val + 2
  }

  function multi2 (val) {
    return val * 2
  }

  // right to left processing --> multi2 then add2
  t.same(map(arr, compose(add2, multi2)), [4, 6, 8])
})
