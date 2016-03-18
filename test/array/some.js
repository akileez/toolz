var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/some and collection/some')
var t = painless.assert

var some = require('../../src/array/some')
var collection = require('../../src/collection/some')
var isEven = require('../../src/number/isEven')

test('should work on normal array', function () {
  var a1 = [1, 2, 3];
  var a2 = [1, 3, 5];
  var a3 = [2, 4, 6];
  t.is(some(a1, isEven), true);
  t.is(some(a2, isEven), false);
  t.is(some(a3, isEven), true);
  t.is(collection(a1, isEven), true);
  t.is(collection(a2, isEven), false);
  t.is(collection(a3, isEven), true);
});

test('should iterate over sparse items', function () {
  var a1 = [1, 2, 3];
  a1[10] = 8;
  var a2 = [1, 3, 5];
  a2[10] = 7;
  var a3 = [2, 4, 6];
  a3[10] = 10;
  t.is(some(a1, isEven), true);
  t.is(some(a2, isEven), false);
  t.is(some(a3, isEven), true);
  t.is(collection(a1, isEven), true);
  t.is(collection(a2, isEven), false);
  t.is(collection(a3, isEven), true);
  // IMPORTANT
  // ---------
  // this behavior is different than ES5 Array#some
  t.is(some(a1, function (val) {
    return val == null;
  }), true);
});

test('should work on empty arrays', function () {
  t.is(some([], isEven), false);
  t.is(collection([], isEven), false);
});

test('should work on null/undefined array', function () {
  // collections not setup to handle null/undefined
  t.is(some(null, isEven), false);
  t.is(some(undefined, isEven), false);
});

test('should be incremental', function () {
  var a = [1, 2, 3]
  var compare = []
  var compose = []
  t.is(some(a, function (val) {
    compare.push(val);
    return val === 3;
  }), true);
  t.same(a, compare);

  t.is(collection(a, function (val) {
    compose.push(val);
    return val === 3;
  }), true);
  t.same(a, compose);
});

test('should allow shorthand object syntax', function () {
  var arr = [{ a: 3 }, { a: 3, b: 2 }, { a: 3, b: 4 }, { a: 3, b: 1 }];
  t.is(collection(arr, { a: 3, b: 2 }), true);
  t.is(collection(arr, { b: 2 }), true);
  t.is(collection(arr, { b: 5 }), false);
});

test('should allow shorthand string syntax', function () {
  var arr = [{ a: 3 }, { a: 3, b: 2 }, { a: 3, b: 4 }, { a: 3, b: 1 }];
  t.is(collection(arr, 'a'), true);
  t.is(collection(arr, 'b'), true);
  t.is(collection(arr, 'c'), false);
});
