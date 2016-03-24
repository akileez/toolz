var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/toPath')
var t = painless.assert

var dotPath = require('../../../src/object/toPath')

test('create object path from a list of strings', function () {
  t.is(dotPath('foo', 'bar', 'baz'), 'foo.bar.baz')
})

test('create object path from an array of strings', function () {
  t.is(dotPath(['foo', 'bar', 'baz']), 'foo.bar.baz')
})

test('create object path from a strings', function () {
  t.is(dotPath('foo.bar.baz'), 'foo.bar.baz')
})

test('create object path from a list of arguments', function () {
  function foo () {
    return dotPath(arguments)
  }

  t.is(foo('foo', 'bar', 'baz'), 'foo.bar.baz')
})

test('create object path from an array of arguments', function () {
  function foo () {
    return dotPath(arguments)
  }

  t.is(foo(['foo', 'bar', 'baz']), 'foo.bar.baz')
})

test('create object path from a mixture of arrays and strings', function () {
  t.is(dotPath('foo', ['bar', 'baz']), 'foo.bar.baz')
  t.is(dotPath(['foo', 'bar'], 'baz'), 'foo.bar.baz')
  t.is(dotPath(['foo', 'bar'], ['baz']), 'foo.bar.baz')
  t.is(dotPath(['foo'], ['bar'], ['baz']), 'foo.bar.baz')
  t.is(dotPath(['foo'], 'bar', ['baz']), 'foo.bar.baz')
})

test('create object path from a mixture of arrays and strings as arguments', function () {
  function foo () {
    return dotPath(arguments)
  }

  t.is(foo('foo', ['bar', 'baz']), 'foo.bar.baz')
  t.is(foo(['foo', 'bar'], 'baz'), 'foo.bar.baz')
  t.is(foo(['foo', 'bar'], ['baz']), 'foo.bar.baz')
  t.is(foo(['foo'], ['bar'], ['baz']), 'foo.bar.baz')
  t.is(foo(['foo'], 'bar', ['baz']), 'foo.bar.baz')
})

test('create object path when arguments is not the first value', function () {
  function foo () {
    return dotPath('options', arguments)
  }

  t.is(foo(['foo', 'bar', 'baz']), 'options.foo.bar.baz')
})

test('create object path discarding any non-string values', function () {
  function foo () {
    return dotPath('options', arguments)
  }

  var fn = function () {
    return
  }

  t.is(foo([fn, 'foo', 'bar', 'baz'], fn, new Date(), {a: 1}, 6, null), 'options.foo.bar.baz')
})
