'use strict'
var painless = require('../../assertion/painless')
var test1 = painless.createGroup('Test function/memorize - function call')
var test2 = painless.createGroup('Test function/memorize - cache')
var t = painless.assert

var memorize = require('../../../src/function/memory')

test1('should produce identical results of a memorized version of fibonacci', function(){
  var fib = function(n) {
    return n < 2 ? n : fib(n - 1) + fib(n - 2);
  };

  t.same(fib(10), 55);

  // Redefine `fib` for memoization
  fib = memorize(fib);

  t.same(fib(10), 55);
});

test1('should check hasOwnProperty', function(){
  var o = function(str) {
    return str;
  };
  var fastO = memorize(o);

  t.same(o('toString'), 'toString');

  t.same(fastO('toString'), 'toString');
});

test1('should cache results', function(){
  // Expose the cache.
  var upper = memorize(function(s) {
    return s.toUpperCase();
  });

  t.same(upper('foo'), 'FOO');
  t.same(upper('bar'), 'BAR');
  t.same(upper.cache.get(), {
    foo: 'FOO',
    bar: 'BAR'
  });

  upper.cache.set('foo', 'BAR')
  upper.cache.set('bar', 'FOO')

  t.same(upper('foo'), 'BAR');
  t.same(upper('bar'), 'FOO');
});

test1('should take a hasher, which doesn\'t change keys', function(){
  var hashed = memorize(function(key) {
    //https://github.com/jashkenas/underscore/pull/1679#discussion_r13736209

    t.is(/[a-z]+/.test(key), true);
    return key;
  }, function(key) {
    return key.toUpperCase();
  });

  hashed('yep');

  t.same(hashed.cache.get(), {
    'YEP': 'yep'
  });
});
