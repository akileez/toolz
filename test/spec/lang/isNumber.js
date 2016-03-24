var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isNumber')
var t = painless.assert

var isNumber = require('../../src/lang/isNumber')

test('should detect if value is a Number', function () {
  t.is( isNumber(0), true)
  t.is( isNumber(123), true)
  // using typeof as a check for number. new Number() is an object
  t.is( isNumber(new Number(123)), false)
  t.is( isNumber(Number('123')), true)

  t.is( isNumber(''), false)
  t.is( isNumber(false), false)
  t.is( isNumber(null), false)
  t.is( isNumber({}), false)
})