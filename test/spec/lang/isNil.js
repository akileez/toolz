var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isNil')
var t = painless.assert

var isNil = require('../../../src/lang/isNil')

test('should detect if value is undefined', function () {
  // isNil checks for null and undefined
  t.is(isNil(undefined), true)
  t.is(isNil(null), true)
  t.is(isNil(), true)

  t.is(isNil(''), false)
  t.is(isNil(123), false)
  t.is(isNil({}), false)
  t.is(isNil([]), false)
})
