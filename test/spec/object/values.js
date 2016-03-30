var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/values')

var t = painless.assert

var values = require('../../../src/object/values')
var contains = require('../../../src/array/contains')

test('should get object values', function () {
  var obj = {
    foo: 123,
    bar: true,
    lorem: 'ipsum'
  }

  var v = values(obj)

  t.is(v.length, 3)

  var haystack = [123, true, 'ipsum']
  t.is(v[0] !== v[1] && v[0] !== v[2], true)
  t.is(contains(haystack, v[0]), true)
  t.is(contains(haystack, v[1]), true)
  t.is(contains(haystack, v[2]), true)
})

test('should avoid dont enum bugs', function () {
  var obj = {
    'toString': 123,
    'valueOf': true,
    'hasOwnProperty': 'ipsum'
  }

  var v = values(obj)

  t.is(v.length, 3)

  var haystack = [123, true, 'ipsum']
  t.is(v[0] !== v[1] && v[0] !== v[2], true)
  t.is(contains(haystack, v[0]), true)
  t.is(contains(haystack, v[1]), true)
  t.is(contains(haystack, v[2]), true)
})

test('should filter prototype properties', function () {
  var Foo = function () {
    this.lorem = 'ipsum'
  }
  Foo.prototype = {foo: 'bar'}

  var obj = new Foo()

  t.is(obj.lorem, 'ipsum')
  t.is(obj.foo, 'bar')
  t.same(values(obj), ['ipsum'])
})
