var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/floor')
var t = painless.assert

var floor = require('../../../src/math/floor')

test('floor value to full steps', function(){
  t.is(floor(12.5), 12)
  t.is(floor(12, 5), 10)
  t.is(floor(17, 5), 15)
  t.is(floor(122, 10), 120)
  t.is(floor(129, 10), 120)
})
