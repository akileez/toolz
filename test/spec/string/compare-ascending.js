var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/compare-ascending')
var t = painless.assert

var comp = require('../../../src/string/compare-ascending')
var each = require('../../../src/array/forEach')

test('should return zero for like strings', function () {
  // Should be associative
  // each([
  //   ['abc', null],
  //   ['abc', '123'],
  //   ['def', 'abc'],
  //   ['ab', 'a'],
  //   ['r69', 'r9'],
  //   ['123', '122'],
  //   ['ac2', 'ab3'],
  //   ['a-12', 'a-11'],
  //   ['11', '-12'],
  //   ['15.05', '15'],
  //   ['15ac', '15ab32'],
  //   ['16', '15ab'],
  //   ['15a123', '15a122'],
  //   ['15ab16', '15ab'],
  //   ['abc', 'Abc'],
  //   ['abc', 'aBc'],
  //   ['aBc', 'Abc']
  // ], function(vals) {
  //   var a = vals[0], b = vals[1];
  //   t.eq(comp(a, b), -1) //, '\'' + a + '\' >= \'' + b + '\'');
  //   t.eq(comp(b, a), 1) //, '\'' + b + '\' <= \'' + a + '\'');
  // });

  each([
    ['123', '123'],
    ['abc', 'abc'],
    ['r12', 'r12'],
    ['12a', '12a']
  ], function(vals) {
    var a = vals[0], b = vals[1];
    t.eq(comp(a, b), 0, '\'' + a + '\' == \'' + b + '\'');
    t.eq(comp(b, a), 0, '\'' + b + '\' == \'' + a + '\'');
  });
});

test('should do something', function () {
  t.is(comp('abc', null), -1)
  t.is(comp(null, 'abc'), 1)
  t.is(comp('abc', undefined), -1)
  t.is(comp(undefined, 'abc'), 1)
  t.is(comp('abc', '123'), 1)
  t.is(comp('123', 'abc'), -1)
  t.is(comp('def', 'abc'), 1)
  t.is(comp('abc', 'def'), -1)
})


test('should do a ascending sort', function () {
  var arr =  ['foo2', 'foo1', 'foo10', 'foo30', 'foo100', 'foo10bar'],
    sorted = ['foo1', 'foo10', 'foo100', 'foo10bar', 'foo2', 'foo30'];
  t.same(arr.sort(comp), sorted);
});