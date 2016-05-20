var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/lerp')
var t = painless.assert

var lerp = require('../../../src/math/lerp')

test('interpolate values', function(){
  t.is(lerp(0.5, 0, 10), 5)
  t.is(lerp(0.75, 0, 100), 75)
  t.is(lerp(0.66, 0, 1000), 660)
  t.is(lerp(1, 0, 1000), 1000)
  t.is(lerp(0, 0, 1000), 0)
})
