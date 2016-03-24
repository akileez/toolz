var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/lastIndexOf')
var t = painless.assert
var lastIdx = require('../../../src/array/lastIndexOf')

test('should work in regular arrays', function () {
  var arr = [1, 'a', 2, 'b'];
  t.eq(lastIdx(arr, 1), 0);
  t.eq(lastIdx(arr, 'a'), 1);
  t.eq(lastIdx(arr, 2), 2);
  t.eq(lastIdx(arr, 'b'), 3);
  t.eq(lastIdx(arr, 'foo'), -1);
});

test('should iterate over sparse items.', function () {
  var arr = [];
  arr[1] = 1;
  arr[3] = 'a';
  arr[4] = undefined; // it's a trap!
  arr[6] = 2;
  arr[8] = 'b';
  // IMPORTANT
  // ---------
  // this behavior is different than ES5 Array#lastIndexOf
  t.eq(lastIdx(arr, 1), 1);
  t.eq(lastIdx(arr, 'a'), 3);
  t.eq(lastIdx(arr, 2), 6);
  t.eq(lastIdx(arr, 'b'), 8);
  t.eq(lastIdx(arr, undefined), 7);
  t.eq(lastIdx(arr, 'foo'), -1);
});

test('should handle fromIndex', function () {
  var arr = [1, 'a', 2, 'b'];
  t.eq(lastIdx(arr, 1, 2), 0);
  t.eq(lastIdx(arr, 'a', -4), -1);
  t.eq(lastIdx(arr, 2, 2), 2);
  t.eq(lastIdx(arr, 'b', 2), -1);
  t.eq(lastIdx(arr, 'foo', 2), -1);
});

test('should handle fromIndex in sparse arrays', function () {
  var arr = [];
  arr[1] = 1;
  arr[3] = 'a';
  arr[6] = 2;
  arr[8] = 'b';
  t.eq(lastIdx(arr, 1, 0), -1);
  t.eq(lastIdx(arr, 'a', 2), -1);
  t.eq(lastIdx(arr, 2, 7), 6);
  t.eq(lastIdx(arr, 'b', 8), 8);
  t.eq(lastIdx(arr, 'foo', 4), -1);
});

test('should handle negative fromIndex', function () {
  var arr = [1, 'a', 2, 'b'];
  t.eq(lastIdx(arr, 1, -2), 0);
  t.eq(lastIdx(arr, 'a', -2), 1);
  t.eq(lastIdx(arr, 2, -2), 2);
  t.eq(lastIdx(arr, 'b', -1), 3);
  t.eq(lastIdx(arr, 'b', -2), -1);
  t.eq(lastIdx(arr, 'b', -3), -1);
  t.eq(lastIdx(arr, 'foo', -2), -1);
});

test('should handle fromIndex greater than length', function () {
  var arr = [1, 'a', 2, 'b'];
  t.eq(lastIdx(arr, 1, 15), 0);
  t.eq(lastIdx(arr, 'a', 15), 1);
  t.eq(lastIdx(arr, 2, 15), 2);
  t.eq(lastIdx(arr, 'b', 15), 3);
  t.eq(lastIdx(arr, 'foo', 15), -1);
});

test('should return -1 if array is null/undefined', function () {
  t.eq(lastIdx(null, 1), -1);
  t.eq(lastIdx(undefined, 1), -1);
});
