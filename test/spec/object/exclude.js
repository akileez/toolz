var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/exclude')
var t = painless.assert

var exclude = require('../../../src/object/exclude')

test('should throw if first param is not a plain object', function () {
  t.throws(() => {exclude('apple')})
  t.throws(() => {exclude(123)})
  t.throws(() => {exclude(['apple'])})
})

test('should throw if second param is not a string (object property)', function () {
  var obj = {a: 'foo', b: 'bar', c: 'baz'}
  t.throws(() => {exclude(obj, 123)})
  t.throws(() => {exclude(obj, [123])})
  t.throws(() => {exclude(obj, {123: 'bam'})})
})

test('should omit prop from obj if keys are undefined', function () {
  var obj = {a: 'foo', b: 'bar', c: 'baz'}
  var actual = exclude(obj, 'c')
  var expected = {a: 'foo', b: 'bar'}

  t.same(actual, expected)
})

test ('should omit deep path with dot notation', function () {
  var obj = {
    a: 'foo',
    b: 'bar',
    c: {
      d: {
        e: 'bam',
        f: 123
      }
    }
  }

  var actual = exclude(obj, 'c.d', 'e')
  var expected = {
    a: 'foo',
    b: 'bar',
    c: {
      d: {
        f: 123
      }
    }
  }

  t.same(actual, expected)
})