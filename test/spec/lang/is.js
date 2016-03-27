var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/is')
var t = painless.assert

var is = require('../../../src/lang/is')

test('should return false if arguments are not identical', function(){
  t.is(is(true, false), false)
  t.is(is(1, true), false)
  t.is(is(1, 0), false)
  t.is(is(-0, +0), false) // yes, they are not identical
  t.is(is('a', 'b'), false)
  t.is(is({}, {}), false)
  t.is(is([], []), false)
  t.is(is(NaN, 'NaN'), false)
  t.is(is(Infinity, -Infinity), false)
})


test('should return true if arguments are identical', function(){
  t.is(is(true, true), true)
  t.is(is(1, 1), true)
  t.is(is(0, 0), true)
  t.is(is('a', 'a'), true)
  var obj = {}
  t.is(is(obj, obj), true)
  var arr = []
  t.is(is(arr, arr), true)
  t.is(is(NaN, NaN), true)
  t.is(is(Infinity, Infinity), true)
})