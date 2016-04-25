var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/enforcePrecision')
var t = painless.assert

var enforcePrecision = require('../../../src/number/enforcePrecision')

test('should remove unnecessary precision', function () {
  var n = 3.12 * 0.01 // 0.031200000000000002 because of floating point precision error (http://en.wikipedia.org/wiki/Floating_point#Accuracy_problems)
  t.isnt(n, 0.0312) // because of floating point error
  t.is(enforcePrecision(n, 4), 0.0312) // "fix" floating point precision error
  t.is(enforcePrecision(n, 2), 0.03)
  t.is(enforcePrecision(n, 0), 0)

  // string comparison to make sure it is triming number
  t.isnt(n + '', '0.0312')
  t.is(enforcePrecision(n, 4) + '', '0.0312')
  t.is(enforcePrecision(n, 2) + '', '0.03')
  t.is(enforcePrecision(n, 0) + '', '0')
})

test('should fix rounding issues', function () {
  var n = 0.615
  t.is(enforcePrecision(n, 4), 0.6150)
  t.is(enforcePrecision(n, 3), 0.615)
  t.is(enforcePrecision(n, 2), 0.62) // (0.615).toFixed(2) == "0.61" which is wrong!
  t.is(enforcePrecision(n, 0), 1)
})

test('should typecast argument to number', function () {
  t.is(enforcePrecision(null, 2), 0)
  t.is(enforcePrecision('', 2), 0)
  t.is(enforcePrecision('123.5666', 2), 123.57)
})
