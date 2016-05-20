var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/map')
var t = painless.assert

var map = require('../../../src/math/map')

test('map a number from one scale to another', function(){
  t.is(map(5, 0, 10, 10, 20), 15)
  t.is(map(-50, -100, 0, 0, 100), 50)
  t.is(map(0, -1, 1, 0, 100), 50)
})
