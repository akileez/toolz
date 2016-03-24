var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isString')
var t = painless.assert

var isString = require('../../src/lang/isString')

test('should detect if value is a string', function () {
  t.is(isString('foo'), true)
  // using typeof as a check for string. new String is an object
  t.is(isString(new String('lorem')), false)
  t.is(isString(String(123)), true)

  t.is(isString(null), false)
  t.is(isString(12), false)
  t.is(isString(false), false)
})
