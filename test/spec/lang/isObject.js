var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isObject')
var t = painless.assert

var isObject = require('../../src/lang/isObject')

test('should detect if value is an object', function () {
  t.is(isObject({}), true)
  t.is(isObject(new function(){}), true)

  t.is(isObject(''), false)
  t.is(isObject(123), false)
  t.is(isObject(null), false)
  t.is(isObject([]), false)
})