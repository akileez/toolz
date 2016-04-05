var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/pad-right')
var t = painless.assert

var rpad = require('../../../src/string/pad-right')

test('should add chars to the right if length is < minLength', function () {
  t.eq(rpad('ab', 0, '-'), 'ab')
  t.eq(rpad('ab', 1, '-'), 'ab')
  t.eq(rpad('ab', 2, '-'), 'ab')
  t.eq(rpad('ab', 3, '-'), 'ab-')
  t.eq(rpad('ab', 4, '-'), 'ab--')
})

test('should add blank spaces (default) to the right if length is < minLength', function () {
  t.eq(rpad('ab', 0), 'ab')
  t.eq(rpad('ab', 1), 'ab')
  t.eq(rpad('ab', 2), 'ab')
  t.eq(rpad('ab', 3), 'ab ')
  t.eq(rpad('ab', 4), 'ab  ')
})

test('should treat null as empty string', function () {
  t.is(rpad(null, 1, '-'), '-')
})

test('should treat undefined as empty string', function () {
  t.is(rpad(void 0, 1, '-'), '-')
})
