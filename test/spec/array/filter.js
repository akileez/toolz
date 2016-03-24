var painless = require('../../assertion/painless')
var t = painless.assert
var test = painless.createGroup('Test array/filter')

var filter = require('../../../src/array/filter')
var filterd = require('../../../src/collection/filter')

test('should filter items', function () {
  var items = [1, 2, 3, 4, 5];
  var result = filter(items, function (val, i, arr) {
    return (val % 2) !== 0;
  });
  t.same(items.length, 5); //make sure it doesn't replace original array
  t.same(result, [1, 3, 5]);
});

test('should loop all array items, even if sparse.', function () {
  var items = new Array(6);
  items[2] = 3;
  items[5] = 8;
  var count = 0;
  var result = filter(items, function (val, i, arr) {
    t.is(arr, items);
    t.is(val, items[i]);
    count += 1;
    return val % 2 === 0;
  });
  t.same(result, [8]);
  // IMPORTANT
  // ---------
  // this behavior is different than ES5 Array#filter
  t.same(count, 6);
});

test('should return empty array if no items match', function () {
  var items = [1, 2, 3, 4, 5];
  var result = filter(items, function (val, i, arr) {
    return false;
  });
  t.same(result, []);
});

test('should return empty array if target is null/undefined', function () {
  var testFunc = function () {
    return true; }
  t.same(filter(undefined, testFunc), []);
  t.same(filter(null, testFunc), []);
});

test('should allow shorthand object syntax', function () {
  // using collection/filter
  var arr = [{ a: 1, b: 1 }, { a: 2, b: 1 }, { a: 1, b: 1, c: 3 }];
  t.same(filterd(arr, { a: 1 }), [arr[0], arr[2]]);
  t.same(filterd(arr, { b: 1 }), [arr[0], arr[1], arr[2]]);
  t.same(filterd(arr, { a: 1, b: 1 }), [arr[0], arr[2]]);
});

test('should allow shorthand string syntax', function () {
  // using collection/filter
  var arr = [{ a: 1, b: 1 }, { a: 2, b: 1 }, { a: 1, b: 1, c: 3 }];
  t.same(filterd(arr, 'a'), [arr[0], arr[1], arr[2]]);
  t.same(filterd(arr, 'c'), [arr[2]]);
  t.same(filterd(arr, 'd'), []);
});
