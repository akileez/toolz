var painless = require('../../assertion/painless')
var test = painless.createGroup('Test math/add')
var t = painless.assert

var add = require('../../../src/math/add')

test('should add an array of numbers', function () {
  var num = [1, 2, 3, 4, 5]
  var expected = add(num)

  t.is(expected, 15)
})

test('should add an argument list of numbers', function () {
  var expected = add(1, 2, 3, 4, 5)

  t.is(expected, 15)
})

test('should scrub non-numbers from given list of arguments or arrays', function () {
  // will not include non-numbers in calculation
  var nums = [1, 2, 3, '4', 4, {a: 'foo'}, 5]
  var expected = add(nums)

  t.is(expected, 15)
  t.is(add(1, 2, 3, '4', 4, {a: 'foo'}, 5), 15)
})

test('should throw if no valid numbers are present', function () {
  t.throws(() => {add(null, null, undefined)})
})