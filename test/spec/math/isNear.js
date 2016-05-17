var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/isNear')
var t = painless.assert

var isNear = require('../../../src/math/isNear')

test('should return true if val is close to target +/- threshold', function(){
  t.is(isNear(10.5, 10, 0.5), true)
  t.is(isNear(9.5, 10, 0.5), true)
  t.is(isNear(9.9, 10, 0.5), true)
  t.is(isNear(10.1, 10, 0.5), true)
  t.is(isNear(10, 10, 0.5), true)
})

test('should return false if val is far from target +/- threshold', function(){
  t.is(isNear(10.51, 10, 0.5), false)
  t.is(isNear(9.45, 10, 0.5), false)
  t.is(isNear(9.1, 10, 0.5), false)
  t.is(isNear(10.9, 10, 0.5), false)
  t.is(isNear(8, 10, 0.5), false)
})
