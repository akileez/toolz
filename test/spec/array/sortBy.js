var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/sortBy')
var t = painless.assert
var sortBy = require('../../src/array/sortBy')

test('should sort array with function', function () {
  var arr = [
    { a: 1 },
    { a: 3 },
    { a: 2 }
  ];
  var result = sortBy(arr, function (item) {
    return item.a; });
  t.same(result, [arr[0], arr[2], arr[1]]);
});

test('should sort array with property name', function () {
  var arr = [
    { a: 3 },
    { a: 5 },
    { a: 1 }
  ];
  var result = sortBy(arr, 'a');
  t.same(sortBy(arr, 'a'), [arr[2], arr[0], arr[1]]);
});

test('should pass index and context to accessor', function () {
  var context = {},
    arr = [
      { b: 'a' },
      { b: 'c' },
      { b: 'b' }
    ];
  var result = sortBy(arr, function (item) {
    t.is(this, context);
    return item.b;
  }, context);
  t.same(result, [arr[0], arr[2], arr[1]]);
});

test('should handle null array', function () {
  var result = sortBy(null, function () {
    return 1; });
  t.same(result, []);
});

test('should handle empty array', function () {
  var result = sortBy([], function () {
    return 1; });
  t.same(result, []);
});

test('should sort items by value if missing callback', function () {
  t.same(sortBy([1, 10, 20, 2, 3, 1]), [1, 1, 2, 3, 10, 20]);
});
