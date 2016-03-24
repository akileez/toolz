var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/initial')
var t = painless.assert
var initial = require('../../../src/array/initial')

test('should return the initial element of an array', function () {
  t.eq(initial(['one', 'two']), 'one');
  t.same(initial([1, 2, 3, 4, 5]), [1,2,3,4]);
  t.same(initial([1]), []);
  t.same(initial([]), undefined);
  t.same(initial(), undefined);
});
