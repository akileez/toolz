var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/union')
var t = painless.assert

var union = require('../../../src/array/union')

test('should add elements to the original array:', function() {
  var arr = ['a'];
  var results = union(arr, ['b', 'c'], ['a'], ['b', 'c'], ['d', 'e', 'f']).sort()
  var expected = ['a', 'b', 'c', 'd', 'e', 'f'].sort()
  t.same(results, expected)
});

test('should union all elements in the given arrays:', function() {
  var results = union(['a'], ['b', 'c'], ['d', 'e', 'f']).sort()
  var expected = ['a', 'b', 'c', 'd', 'e', 'f'].sort()
  t.same(results, expected)
});

test('should ignore falsey values', function() {
  var results = union(['a'], undefined, ['d', 'e', 'f'], null).sort()
  var expected = ['a', 'd', 'e', 'f'].sort()
  t.same(results, expected)
});

test('should not arrayify non-array values', function() {
  var results = union(['a'], 'cde', {s: 4}, ['d', 'e', 'f'], 2, false, new Date()).sort()
  var expected = ['a', 'd', 'e', 'f'].sort()
  t.same(results, expected)
});

test('should uniquify elements from additional arrays:', function() {
  var arr = ['a', 'b', 'c'];
  var res = union(arr, ['b', 'c'], ['a'], ['b', 'c'], ['d', 'e', 'f']).sort()

  t.same(res, ['a', 'b', 'c', 'd', 'e', 'f'].sort())
});