var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/compare-natural')
var t = painless.assert

var naturalCmp = require('../../../src/string/compare-natural')
var each = require('../../../src/array/forEach')

test('underscore.string naturalCmp test', function() {
  // Should be associative
  each([
    ['abc', null],
    ['abc', '123'],
    ['def', 'abc'],
    ['ab', 'a'],
    ['r69', 'r9'],
    ['123', '122'],
    ['ac2', 'ab3'],
    ['a-12', 'a-11'],
    ['11', '-12'],
    ['15.05', '15'],
    ['15ac', '15ab32'],
    ['16', '15ab'],
    ['15a123', '15a122'],
    ['15ab16', '15ab'],
    ['abc', 'Abc'],
    ['abc', 'aBc'],
    ['aBc', 'Abc']
  ], function(vals) {
    var a = vals[0], b = vals[1];
    t.eq(naturalCmp(a, b), 1, '\'' + a + '\' >= \'' + b + '\'');
    t.eq(naturalCmp(b, a), -1, '\'' + b + '\' <= \'' + a + '\'');
  });

  each([
    ['123', '123'],
    ['abc', 'abc'],
    ['r12', 'r12'],
    ['12a', '12a']
  ], function(vals) {
    var a = vals[0], b = vals[1];
    t.eq(naturalCmp(a, b), 0, '\'' + a + '\' == \'' + b + '\'');
    t.eq(naturalCmp(b, a), 0, '\'' + b + '\' == \'' + a + '\'');
  });
});

test('underscore.string naturalSort test', function() {
  var arr =  ['foo2', 'foo1', 'foo10', 'foo30', 'foo100', 'foo10bar'],
    sorted = ['foo1', 'foo2', 'foo10', 'foo10bar', 'foo30', 'foo100'];
  t.same(arr.sort(naturalCmp), sorted);
});