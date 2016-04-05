var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/trim')
var t = painless.assert

var trim = require('../../../src/string/trim')

test('should remove whitespaces from begin and end of string', function () {
  var str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
  t.eq(trim(str), 'lorem  ipsum');
});

test('should remove whitespaces from beginning of string', function () {
  var str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
  t.eq(trim.left(str), 'lorem  ipsum    \t \t  \t\t  ');
});

test('should remove whitespaces from end of string', function () {
  var str = '   \t \t \t\t     lorem  ipsum    \t \t  \t\t  ';
  t.eq(trim.right(str), '   \t \t \t\t     lorem  ipsum');
});

test('should remove specified chars from begin and end of string', function () {
  var str = '-+-*test*-+-';
  var chars = ['-', '+', '*'];
  t.eq(trim(str, chars), 'test');
});

test('should remove specified chars from beginning of string', function () {
  var str = '-+-*test*-+-';
  var chars = ['-', '+', '*'];
  t.eq(trim.left(str, chars), 'test*-+-');
});

test('should remove specified chars from end of string', function () {
  var str = '-+-*test*-+-';
  var chars = ['-', '+', '*'];
  t.eq(trim.right(str, chars), '-+-*test');
});

test('should treat null as empty string', function () {
  t.is(trim(null), '');
});

test('should treat undefined as empty string', function () {
  t.is(trim(void 0), '');
});
