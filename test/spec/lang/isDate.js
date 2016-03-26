var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isDate')
var t = painless.assert

var isDate = require('../../../src/lang/isDate')

test('should detect if value is a Date', function () {
  t.is(isDate(new Date()), true)

  t.is(isDate(''), false)
  t.is(isDate(123), false)
  t.is(isDate(null), false)
  t.is(isDate({}), false)
  t.is(isDate([]), false)
})
