'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/partial')
var t = painless.assert

var partial = require('../../../src/function/partial')

var _ = partial._;

var add = function(a, b){
  return a + b;
};

var append = function(a, b, c) {
  return a + b + c;
};

test('should curry arguments', function(){
  var addTen = partial(add, 10);
  t.is(addTen(2), 12)
  t.is(addTen(5), 15)
});

test('should curry multiple arguments', function(){
  t.is(partial(add, 10, 5)(), 15)
});

test('should partially apply an argument with placeholder', function() {
  t.is(partial(append, _, 'b', 'c')('a'), 'abc')
});

test('should partially apply multiple arguments with placeholder', function() {
  t.is(partial(append, _, _, 'c')('a', 'b'), 'abc')
});

test('should partially apply multiple arguments with placeholder interleaved', function() {
  t.is(partial(append, _, 'b', _)('a', 'c'), 'abc')
});
