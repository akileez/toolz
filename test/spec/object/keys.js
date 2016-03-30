var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/keys')

var t = painless.assert

var keys = require('../../../src/object/keys')
var contains = require('../../../src/array/contains')

test('should get object keys', function () {
  var obj = {
    foo: 123,
    bar: true,
    lorem: 'ipsum'
  }

  var k = keys(obj)

  t.is(k.length, 3)

  var haystack = ['foo', 'bar', 'lorem']
  t.is(k[0] !== k[1] && k[0] !== k[2], true)
  t.is(contains(haystack, k[0]), true)
  t.is(contains(haystack, k[1]), true)
  t.is(contains(haystack, k[2]), true)
})

test('should avoid dont enum bugs', function () {
  var obj = {
    'toString': 123,
    'valueOf': true,
    'hasOwnProperty': 'ipsum'
  }

  var k = keys(obj)

  t.is(k.length, 3)

  var haystack = ['toString', 'valueOf', 'hasOwnProperty']
  t.is(k[0] !== k[1] && k[0] !== k[2], true)
  t.is(contains(haystack, k[0]), true)
  t.is(contains(haystack, k[1]), true)
  t.is(contains(haystack, k[2]), true)
})

test('should filter prototype properties', function () {
  var Foo = function () {
    this.lorem = 'ipsum'
  }
  Foo.prototype = {foo: 'bar'}

  var obj = new Foo()

  t.is(obj.lorem, 'ipsum')
  t.is(obj.foo, 'bar')
  t.same(keys(obj), ['lorem'])
})
