var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/defaults')
var t = painless.assert

var defaults = require('../../../src/lang/defaults')

test('should return first non void value', function () {
  var a
  var b = null

  t.is(defaults(a, 'foo'), 'foo')
  t.is(defaults(b, 'bar'), 'bar')
  t.is(defaults(a, b, 123), 123)
  t.is(defaults(a, b, 123, 'dolor'), 123)
  t.is(defaults(a, false, b, 123, 'dolor'), false)
  t.is(defaults(a, true, b, 123, 'dolor'), true)

  var obj = {}
  t.is(defaults(obj, a, b, 123, 'dolor'), obj)
  t.is(defaults(a, b, obj, 123, 'dolor'), obj)
})
