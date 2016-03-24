var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/repeat')
var t = painless.assert

var repeat = require('../../src/array/repeat')

test('should repeat the given string:', function () {
  t.same(repeat('a', 5), ['a', 'a', 'a', 'a', 'a']);
  t.same(repeat('a', 50), ['a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a','a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a','a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a','a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a','a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a', 'a']);
  t.same(repeat('a', 1), ['a']);
  t.same(repeat('a', 0), []);
});

test('should repeat the given object:', function () {
  t.same(repeat({a: 'b'}, 5), [{a: 'b'},{a: 'b'},{a: 'b'},{a: 'b'},{a: 'b'}]);
});

test('should repeat null:', function () {
  t.same(repeat(null, 5), [null, null, null, null, null]);
});