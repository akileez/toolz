var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/convert')
var t = painless.assert
var convert = require('../../../src/array/convert')

test('convert array like objects into array', function () {
  var obj = {
    '0': 'foo',
    '1': 'bar',
    '2': 'baz',
    length: 3
  }

  t.same(convert.toArray(obj), ['foo', 'bar', 'baz'])
  t.diff(convert(obj), ['foo', 'bar', 'baz'])
})

test('convert arguments object', function () {
  var res1
  var res2
  var fn = function (a, b, c) {
    res1 = convert.toArray(arguments)
  }

  var fm = function (a, b, c) {
    res2 = convert(arguments)
  }

  fn('foo', 'bar', 123)
  fm('foo', 'bar', 123)

  t.same(res1, ['foo', 'bar', 123])
  t.diff(res2, ['foo', 'bar', 123])
})

test('handle primitives and other objects', function () {
  var fn = function () {}

  t.same(convert('lorem'), ['lorem'])
  t.same(convert(''), [''])
  t.same(convert(123), [123])
  t.same(convert(0), [0])
  t.same(convert(/\w+/), [/\w+/])
  t.same(convert(new RegExp('\\w+')), [/\w+/])
  t.same(convert({foo:"bar", lorem:123}), [{foo:"bar", lorem:123}])
  t.same(convert(true), [true], 'expect convert(true) to be [true]')
  t.same(convert(false), [false])
  t.same(convert(fn), [fn])

  t.same(convert.toArray('lorem'), ['lorem'])
  t.same(convert.toArray(''), [''])
  t.same(convert.toArray(123), [123])
  t.same(convert.toArray(0), [0])
  t.same(convert.toArray(/\w+/), [/\w+/])
  t.same(convert.toArray(new RegExp('\\w+')), [/\w+/])
  t.same(convert.toArray({foo:"bar", lorem:123}), [{foo:"bar", lorem:123}])
  t.same(convert.toArray(true), [true])
  t.same(convert.toArray(false), [false])
  t.same(convert.toArray(fn), [fn])
})

test('handle null or undefined values', function () {
  t.same(convert(null), [])
  t.same(convert(undefined), [])
  t.same(convert(), [])

  t.same(convert.toArray(null), [])
  t.same(convert.toArray(undefined), [])
  t.same(convert.toArray(), [])
})

test('assertion test', function () {
  t.assert(convert('foo')[0] === 'foo')
  t.assert(convert(['foo'])[0] === 'foo')
  t.assert(convert(null)[0] === undefined)
  t.assert(convert(undefined)[0] === undefined)

  t.assert(convert.toArray('foo')[0] === 'foo')
  t.assert(convert.toArray(['foo'])[0] === 'foo')
  t.assert(convert.toArray(null)[0] === undefined)
  t.assert(convert.toArray(undefined)[0] === undefined)
})

// test.result()
