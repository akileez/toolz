var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/countSteps')
var t = painless.assert

var countSteps = require('../../../src/math/countSteps')

test('count number of full steps', function(){
  t.is(countSteps(12, 5), 2)
  t.is(countSteps(17, 5), 3)
  t.is(countSteps(122, 10), 12)
  t.is(countSteps(129, 10), 12)
})

test('should work with step fractures', function(){
  t.is(countSteps(3.1415, 0.02, 10), 7)
})
