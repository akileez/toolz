var painless = require('../../src/assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test array/uniq')

var uniq   = require('../../src/array/uniq')
var unique = require('../../src/array/unique')
var uneek  = require('../../src/array/uneek')

test('uniq should remove duplicates', function () {
  var source = ['a', 1, 2, 'c', 'b', 2, 1, 'b', 'c']

  var res = uniq(source)
  var expected = ['a', 1, 2, 'c', 'b']

  // should not affect original array
  t.is(source.length, 9)

  // duplicates are removed starting from end of array!
  t.same(res, expected)
});

test('unique should remove duplicates', function () {
  var source = ['a', 1, 2, 'c', 'b', 2, 1, 'b', 'c']

  var res = unique(source)
  // var res3 = uneek(source)
  var expected = ['a', 2, 1, 'b', 'c']

  // should not affect original array
  t.is(source.length, 9)

  // duplicates are removed starting from begining of array!
  t.same(res, expected)
});

test('uneek should remove duplicates', function () {
  var source = ['a', 1, 2, 'c', 'b', 2, 1, 'b', 'c']

  var res = uneek(source)
  var expected = [1, 2, 'a', 'b', 'c']

  // should affect original array
  t.is(source.length, 5)

  // duplicates are removed starting from begining of array!
  t.same(res, expected)
  t.is(uneek([1,1,2,3,5,5,7]).join(), [1,2,3,5,7].join())
  t.is(uneek([]).join(), [].join())
  t.is(uneek([1,1,1]).join(), [1].join())
  t.is(uneek([1,1,1,2,2,2], function(a,b) { return (a^b)&1 }).join(), [2,1].join())
});

test('uniq should return empty array if source array is null/undefined', function () {
  t.same(uniq(null), [])
  t.same(uniq(undefined), [])
  t.same(uniq([]), [])
});

test('unique should return empty array if source array is null/undefined', function () {
  t.same(unique(null), [])
  t.same(unique(undefined), [])
  t.same(unique([]), [])
});

test('uneek should return empty array if source array is null/undefined', function () {
  t.same(uneek(null), [])
  t.same(uneek(undefined), [])
  t.same(uneek([]), [])
});

test('unique should support custom compare function', function () {
  var arr = [{ name: 'foo' }, { name: 'bar' }, { name: 'foo' }];
  var result = unique(arr, function (a, b) {
    return a.name === b.name;
  });
  // note that it removes duplicates starting from begin of array
  t.same(result, arr.slice(1, 3));
});

test('uneek should support custom compare function and sort option', function () {
  t.is(uneek([1,1,1,2,2,2], function(a,b) {
    return (a^b)&1
  }, true).join(), [1,2].join())

  var arr = [{ name: 'foo' }, { name: 'bar' }, { name: 'foo' }];
  var result = uneek(arr, function (a, b) {
    return a.name === b.name;
  });
  // note that it removes duplicates starting from begin of array
  t.same(result, arr.slice(0, 2));
});

test('uneek should support sort option only', function () {
  t.is(uneek([1,1,1,2,2,2], true).join(), [1,2].join())

});
