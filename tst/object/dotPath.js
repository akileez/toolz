var test = require('../../src/assertion/ttr')
var dotPath = require('../../src/object/dotPath')

test('create object path from a list of strings', function (t) {
  t.is(dotPath('foo', 'bar', 'baz'), 'foo.bar.baz')
})

test('create object path from an array of strings', function (t) {
  t.is(dotPath(['foo', 'bar', 'baz']), 'foo.bar.baz')
})

test('create object path from a strings', function (t) {
  t.is(dotPath('foo.bar.baz'), 'foo.bar.baz')
})

test('create object path from a list of arguments', function (t) {
  function foo () {
    return dotPath(arguments)
  }

  t.is(foo('foo', 'bar', 'baz'), 'foo.bar.baz')
})

test('create object path from an array of arguments', function (t) {
  function foo () {
    return dotPath(arguments)
  }

  t.is(foo(['foo', 'bar', 'baz']), 'foo.bar.baz')
})

test('create object path from a mixture of arrays and strings', function (t) {
  t.is(dotPath('foo', ['bar', 'baz']), 'foo.bar.baz')
  t.is(dotPath(['foo', 'bar'], 'baz'), 'foo.bar.baz')
  t.is(dotPath(['foo', 'bar'], ['baz']), 'foo.bar.baz')
  t.is(dotPath(['foo'], ['bar'], ['baz']), 'foo.bar.baz')
  t.is(dotPath(['foo'], 'bar', ['baz']), 'foo.bar.baz')
})

test('create object path from a mixture of arrays and strings as arguments', function (t) {
  function foo () {
    return dotPath(arguments)
  }

  t.is(foo('foo', ['bar', 'baz']), 'foo.bar.baz')
  t.is(foo(['foo', 'bar'], 'baz'), 'foo.bar.baz')
  t.is(foo(['foo', 'bar'], ['baz']), 'foo.bar.baz')
  t.is(foo(['foo'], ['bar'], ['baz']), 'foo.bar.baz')
  t.is(foo(['foo'], 'bar', ['baz']), 'foo.bar.baz')
})

test.result()