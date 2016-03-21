var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isNull')
var t = painless.assert

var isNull = require('../../src/lang/isNull')

test('should detect if value is a Null', function () {
  t.is(isNull(null), true)

  t.is(isNull(''), false)
  t.is(isNull(123), false)
  t.is(isNull([]), false)
  t.is(isNull({}), false)
})
