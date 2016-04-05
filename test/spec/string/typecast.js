var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/typecast')
var t = painless.assert

var typecast = require('../../../src/string/typecast')

test('should typecast values if Number, Boolean, null or undefined', function () {
  t.is(typecast('true'), true)
  t.is(typecast('false'), false)
  t.is(typecast('123'), 123)
  t.is(typecast('123.45'), 123.45)
  t.is(typecast('null'), null)
  t.is(typecast(null), null)
  t.is(typecast('undefined'), undefined)
  t.is(typecast(), undefined)
  t.is(typecast('foo'), "foo")
})
