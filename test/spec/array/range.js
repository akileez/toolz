var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/range')
var t = painless.assert
var range = require('../../../src/array/range')

test('should return an array with range steps', function () {
  t.same(range(0, 10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  t.same(range(5, 8), [5, 6, 7, 8]);
});

test('should allow a custom step size', function () {
  t.same(range(0, 10, 2), [0, 2, 4, 6, 8, 10]);
  t.same(range(0, 10, 3), [0, 3, 6, 9]);
  t.same(range(-9, 10, 3), [-9, -6, -3, 0, 3, 6, 9]);
  t.same(range(10, 50, 10), [10, 20, 30, 40, 50]);
});

test('default start should be zero', function () {
  t.same(range(10), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});

test('should return a single step if length is zero', function () {
  t.same(range(0, 0), [0]);
  t.same(range(1, 1), [1]);
  t.same(range(5, 5, 2), [5]);
});

test('should return empty range if (end < start)', function () {
  t.same(range(5, -5), []);
  t.same(range(1, 0), []);
});

test('should return empty range if no args', function () {
  t.same(range(), []);
  t.same(range(), []);
});
