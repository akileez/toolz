var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/contains')
var t = painless.assert

var contains = require('../../../src/string/contains')

test('should return true if string contains substring', function () {
  t.eq(contains('lorem ipsum', 'lor'), true)
  t.eq(contains('lorem ipsum', 'o'), true)
  t.eq(contains('lorem ipsum', 'ip'), true)
  t.eq(contains('lorem ipsum', 'sum'), true)
})

test('should return false if string doesn\'t contain substring', function () {
  t.eq(contains('lorem ipsum', 'a'), false)
  t.eq(contains('lorem ipsum', 'lord'), false)
  t.eq(contains('lorem ipsum', 'bar'), false)
})

test('should work with empty strings', function () {
  t.eq(contains('', ''), true)
  t.eq(contains('foo', ''), true)
})

test('should treat null as empty string', function () {
  t.eq(contains(null, 'a'), false)
  t.eq(contains(null, ''), true)
  t.eq(contains('', null), true)
})

test('should treat undefined as empty string', function () {
  t.eq(contains(void 0, ''), true)
  t.eq(contains('a', void 0), true)
})

test('should start search at given "fromIndex"', function () {
  t.eq(contains('lorem ipsum', 'o', 0), true)
  t.eq(contains('lorem ipsum', 'o', 1), true)
  t.eq(contains('lorem ipsum', 'o', 2), false)
  t.eq(contains('lorem ipsum', 'o', 200), false)
})

test('should treat negative fromIndex === 0', function () {
  t.eq(contains('lorem ipsum', 'o', -1), true)
  t.eq(contains('lorem ipsum', 'o', -9), true)
  t.eq(contains('lorem ipsum', 'o', -10), true)
  t.eq(contains('lorem ipsum', 'o', -11), true)
})
