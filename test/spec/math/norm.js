var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/norm')
var t = painless.assert

var norm = require('../../../src/math/norm')

test('should normalize value inside range', function(){
  t.is(norm(50, 0, 100), 0.5)
  t.is(norm(200, 0, 500), 0.4)
  t.is(norm(200, 0, 1000), 0.2)
  t.is(norm(1000, 1000, 1001), 0)
})

test('should throw if value outside range', function(){
  t.throws(norm.bind(null, 1500, 0, 1000))
  t.throws(norm.bind(null, -1500, 0, 1000))
})

test('should return 1 if min equals max', function(){
  t.is(norm(100, 100, 100), 1)
})

test('should throw error if value outside range', function() {
  t.throws(function() {
    norm(-50, 0, 100)
  }, 'value (-50) must be between 0 and 100')
})
