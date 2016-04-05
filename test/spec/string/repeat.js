var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/repeat')
var t = painless.assert

var repeat = require('../../../src/string/repeat')

test('should repeat string n times', function () {
  t.eq(repeat('a', 3), 'aaa')
  t.eq(repeat('ab', 3), 'ababab')
  t.eq(repeat('a', 1), 'a')
  t.eq(repeat('a', 0), '')
})

test('should treat null as empty string', function () {
  t.eq(repeat(null, 1), '')
})

test('should tread undefined as empty string', function () {
  t.eq(repeat(void 0, 1), '')
})
test('should treat "ab" as not a number', function () {
  t.eq(repeat('a', 'ab'), '')
})
