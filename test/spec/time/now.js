var painless = require('../../assertion/painless')
var test = painless.createGroup('Test time/now')
var t = painless.assert

var now = require('../../../src/time/now')

var past = now()

test('should return an integer', function () {
  var b = now()
  t.is(b.toFixed('0'), b + '')
})

test('should be greater than first call', function () {
  t.assert(now() > past)
})
