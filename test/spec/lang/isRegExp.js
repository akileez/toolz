var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/isRegExp')
var t = painless.assert

var isRegExp = require('../../src/lang/isRegExp')

test('should detect if value is a RegExp', function () {
  t.is( isRegExp(/\w+/), true)
  t.is( isRegExp(new RegExp('\\w+', 'g')), true)

  t.is( isRegExp(''), false)
  t.is( isRegExp(123), false)
  t.is( isRegExp(null), false)
  t.is( isRegExp({}), false)
  t.is( isRegExp([]), false)
})