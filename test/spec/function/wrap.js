'use strict'
var painless = require('../../assertion/painless')
var test = painless.createGroup('Test function/wrap')
var t = painless.assert

var wrap = require('../../../src/function/wrap')

function add (a, b) {
  return a + b
}

test('should create a wrapped function', function(){
  var wrapped = wrap(add, function(func, a, b){
    return func(a + 2, b);
  });

  t.is(wrapped(1, 2), 5);
});

test('should pass the correct `wrapper` arguments', function(){
  var args;
  var noop = function(){};

  var wrapped = wrap(noop, function() {
    args || (args = Array.prototype.slice.call(arguments));
  });

  wrapped(1, 2, 3);
  t.same(args, [noop, 1, 2, 3]);
});

test('should not set a `this` binding', function() {
  var wrapped = wrap(add, function(func){
    return func(this.a + this.b);
  });

  var obj = {
    'wrapped': wrapped,
    'a': 1,
    'b': 2
  };

  console.log(wrapped(1, 2))
  t.same(obj.wrapped(), 3);
});
