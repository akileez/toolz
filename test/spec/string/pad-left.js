var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/pad-left')
var t = painless.assert

var lpad = require('../../../src/string/pad-left')

test('should add chars to the left if length is < minLength', function () {
  t.eq(lpad('ab', 0, '-'), 'ab');
  t.eq(lpad('ab', 1, '-'), 'ab');
  t.eq(lpad('ab', 2, '-'), 'ab');
  t.eq(lpad('ab', 3, '-'), '-ab');
  t.eq(lpad('ab', 4, '-'), '--ab');
});

test('should add blank spaces (default) to the left if length is < minLength', function () {
  t.eq(lpad('ab', 0), 'ab');
  t.eq(lpad('ab', 1), 'ab');
  t.eq(lpad('ab', 2), 'ab');
  t.eq(lpad('ab', 3), ' ab');
  t.eq(lpad('ab', 4), '  ab');
});

test('should treat null as empty string', function () {
  t.is(lpad(null, 1, '-'), '-');
});

test('should treat undefined as empty string', function () {
  t.is(lpad(void 0, 1, '-'), '-');
});
