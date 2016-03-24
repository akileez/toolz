var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/join')
var t = painless.assert
var join = require('../../../src/array/join')

test('should join strings in the array', function () {
  var arr = ['foo', 'bar'];
  t.eq(join(arr, ', '), 'foo, bar');
});

test('should convert items to string', function () {
  var testObj = { toString: function () {
        return 'test'; } },
    arr = [0, 1, 2, testObj];
  t.eq(join(arr, '+'), '0+1+2+test');
});

test('should default to blank separator', function () {
  var arr = ['foo', 'bar'];
  t.eq(join(arr), 'foobar');
});

test('should exclude null and empty values', function () {
  var arr = [null, 'foo', '', 'bar', undefined, 'baz'];
  t.eq(join(arr, '-'), 'foo-bar-baz');
});

test('should return empty string when array is null/undefined', function () {
  t.eq(join(null), '');
  t.eq(join(undefined), '');
});
