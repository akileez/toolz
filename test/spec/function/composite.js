'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/composite')
var t = painless.assert

var composite = require('../../../src/function/composite')

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

  // left to right processing --> add2 then multi2
  t.same(map(arr, composite(add2, multi2)), [6, 8, 10])
})
