var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/last')
var t = painless.assert
var last = require('../../src/array/last')

test('should return the last element of an array', function () {
  t.eq(last(['one', 'two']), 'two');
  t.eq(last([1, 2, 3, 4, 5]), 5);
  t.eq(last([1]), 1);
  t.same(last([]), undefined);
  t.same(last(), undefined);
});
