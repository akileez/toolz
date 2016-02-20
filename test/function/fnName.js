var painless = require('../../src/assertion/painless')
var t        = painless.assert
var test     = painless.createGroup('Test function/fnName')

var fnName   = require('../../src/function/fnName')

test('is exported as a function', function () {
  t.equal(typeof fnName, 'function');
});

test('can extract the name from a function declaration', function () {
  function foobar() {}

  t.equal(fnName(foobar), 'foobar');
  t.equal(fnName(function named () {return 123}), 'named')
});

test('can extract the name from a function expression', function () {
  var a = function bar() {};

  t.equal(fnName(a), 'bar');
});

test('can be overriden using displayName', function () {
  var a = function bar() {};
  a.displayName = 'bro';

  t.equal(fnName(a), 'bro');
});

test('works with constructed instances', function () {
  function Bar(){}

  var foo = new Bar();

  t.equal(fnName(foo), 'Bar');
});

test('works with anonymous', function () {
  t.equal(fnName(function () {}), 'anonymous');
  t.equal(fnName(function () {return 123}), 'anonymous')
  t.equal(fnName(() => 123), 'anonymous')
  t.equal(fnName(() => {return 123}), 'anonymous')
  t.equal(fnName((a, b, c) => a + b + c), 'anonymous')
  t.equal(fnName((a, b) => {return a + b}), 'anonymous')
});

test('returns the className if we were not given a function', function () {
  t.equal(fnName('string'), 'String');
});
