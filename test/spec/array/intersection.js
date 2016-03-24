var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/intersection')
var t = painless.assert
var intersection = require('../../../src/array/intersection')

test('should keep only items that are present on all arrays', function () {
  var a = ['a', 'b', 1],
    b = ['c', 1],
    c = [1, 2, 3];
  t.same(intersection(a, b, c), [1]);
});

test('should remove duplicates', function () {
  var a = ['a', 'b', 1],
    b = ['c', 'a', 1],
    c = [1, 'b', 2, 3, 'a'];
  t.same(intersection(a, b, c), ['a', 1]);
});

test('should return an empty array if no intersection', function () {
  var a = ['b'],
    b = ['c', 'a'],
    c = [1, 'b', 2, 3, 'a'];
  t.same(intersection(a, b, c), []);
});

test('should use empty array when null/undefined', function () {
  t.same(intersection([1, 2], null, [1]), []);
  t.same(intersection([1, 2], undefined, [1]), []);
});
