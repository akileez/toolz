var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/subtract')
var t = painless.assert

var subtract = require('../../../src/math/subtract')

test('should subtract an array of numbers', function () {
  var num = [1, 2, 3, 4, 5].reverse()
  var expected = subtract(num)

  t.is(expected, -5)
})

test('should subtract an argument list of numbers', function () {
  var expected = subtract(5, 4, 3, 2, 1)

  t.is(expected, -5)
})