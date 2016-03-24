var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/reduceRight')
var t = painless.assert
var reduceRight = require('../../src/array/reduceRight')

test('should reduce array into a single value', function () {
  var arr = [1, 2, 3, 4];
  var compare1 = [];
  var compare2 = [];

  function sum(prev, cur, idx, arr) {
    compare1.push(prev);
    return prev + cur;
  }

  function mult(prev, cur, idx, arr) {
    compare2.push(prev);
    return prev * cur;
  }
  t.eq(reduceRight(arr, sum), 10);
  t.eq(reduceRight(arr, mult), 24);
  t.same(compare1, [4, 7, 9]);
  t.same(compare2, [4, 12, 24]);
});

test('should allow init value', function () {
  var arr = [1, 2, 3, 4];

  function sum(prev, cur, idx, arr) {
    return prev + cur;
  }

  function mult(prev, cur, idx, arr) {
    return prev * cur;
  }
  t.eq(reduceRight(arr, sum, 10), 20);
  t.eq(reduceRight(arr, mult, 10), 240);
});

test('should pass proper params to callback', function () {
  var base = [1, 2, 3, 4];

  function foo(prev, cur, idx, arr) {
    t.eq(arr[idx + 1], prev);
    t.eq(arr, base);
    return cur;
  }
  t.eq(reduceRight(base, foo), 1);
});

test('should throw error if empty', function () {
  function sum(prev, cur, idx, arr) {
    return prev + cur;
  }
  t.throws(function () { reduceRight([], sum); })
});

test('should throw error if null/undefined', function () {
  var testFunc = function () {};
  t.throws(function () { reduceRight(null, testFunc) })
  t.throws(function () { reduceRight(undefined, testFunc) })
});

test('should work on empty arrays if provide initVal', function () {
  function sum(prev, cur, idx, arr) {
    return prev + cur;
  }
  t.eq(reduceRight([], sum, 10), 10);
});

test('should work on null/undefined array if initVal provided', function () {
  var testFunc = function () {};
  t.eq(reduceRight(null, testFunc, 10), 10);
  t.eq(reduceRight(undefined, testFunc, 10), 10);
});

test('should iterate over sparse items. see #64', function () {
  function specialSum(prev, cur, i, arr) {
    var a = prev == null ? 1 : prev;
    var b = cur == null ? 1 : cur;
    return a + b;
  }
  var base = [1, 5];
  base[7] = 4;
  base[10] = undefined;
  // IMPORTANT
  // ---------
  // this behavior is different than ES5 Array#reduceRight
  t.is(reduceRight(base, specialSum), 18);
  t.is(reduceRight(base, specialSum, 2), 20);
});

test('should allow "undefined" as initial value', function () {
  // thx @jdalton for catching this one see #gh-57
  var base = [1, 2, 3];
  var compare = [];
  var r = reduceRight(base, function (prev, cur, i, arr) {
    compare.push(prev);
    return prev == null ? cur : prev * cur;
  }, undefined);
  t.eq(r, 6);
  t.same(compare, [undefined, 3, 6]);
});
