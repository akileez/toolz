var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isArguments')
var t = painless.assert

var isArguments = require('../../src/lang/isArguments')

test('should detect if value is arguments', function () {
  t.is(isArguments(arguments), true)
  t.is(isArguments(''), false)
  t.is(isArguments(123), false)
  t.is(isArguments(null), false)
  t.is(isArguments({}), false)
  t.is(isArguments([]), false)
})