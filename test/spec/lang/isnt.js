var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isnt')
var t = painless.assert

var isnt = require('../../../src/lang/isnt')

test('should return true if arguments are not identical', function(){
  t.is(isnt(true, false), true)
  t.is(isnt(1, true), true)
  t.is(isnt(1, 0), true)
  t.is(isnt(-0, +0), true) // yes, they are not identical
  t.is(isnt('a', 'b'), true)
  t.is(isnt({}, {}), true)
  t.is(isnt([], []), true)
  t.is(isnt(NaN, 'NaN'), true)
  t.is(isnt(Infinity, -Infinity), true)
})


test('should return false if arguments are identical', function(){
  t.is(isnt(true, true), false)
  t.is(isnt(1, 1), false)
  t.is(isnt(0, 0), false)
  t.is(isnt('a', 'a'), false)
  var obj = {}
  t.is(isnt(obj, obj), false)
  var arr = []
  t.is(isnt(arr, arr), false)
  t.is(isnt(NaN, NaN), false)
  t.is(isnt(Infinity, Infinity), false)
})