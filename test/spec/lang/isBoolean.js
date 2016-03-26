var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isBoolean')
var t = painless.assert

var isBoolean = require('../../../src/lang/isBoolean')

test('should detect if value is a Boolean', function () {
  t.is(isBoolean(true), true)
  t.is(isBoolean(false), true)

  t.is(isBoolean(Boolean(0)), true)
  t.is(isBoolean(Boolean(1)), true)

  t.is(isBoolean(''), false)
  t.is(isBoolean(123), false)
  t.is(isBoolean(null), false)
  t.is(isBoolean({}), false)

  // these create objects wrappers and therefore false
  // base on Object.prototype.call
  t.is(isBoolean(new Boolean(false)), false)
  t.is(isBoolean(new Boolean(true)), false)
})
