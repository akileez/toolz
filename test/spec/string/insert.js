var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/insert')
var t = painless.assert

var insert = require('../../../src/string/insert')

test('should add a substring', function () {
  t.is(insert('bcde', 0, 'a'), 'abcde');
  t.is(insert('abc', 10, 'd'), 'abcd');
  t.is(insert('abc', 3, 'd'), 'abcd');
  t.is(insert('abde', 2, 'c'), 'abcde');
  t.is(insert('this is a sentence', 10, 'short '), 'this is a short sentence');
});

test('should accept negative indexes', function () {
  t.is(insert('abd', -1, 'c'), 'abcd');
  t.is(insert('cdef', -10, 'ab'), 'abcdef');
});

test('should treat null as empty string', function () {
  t.is(insert(null, 0, ''), '');
});

test('should treat undefined as empty string', function () {
  t.is(insert(void 0, 0, ''), '');
});
