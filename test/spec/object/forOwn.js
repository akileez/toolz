var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/forOwn')

var t = painless.assert

var forOwn = require('../../../src/object/forOwn')
var contains = require('../../../src/array/contains')

test('should loop through all properties', function () {
  var obj = {
    foo: 123,
    bar: true,
    lorem: 'ipsum'
  }

  var keys = []
  var vals = []

  forOwn(obj, function (val, key, o) {
    t.same(o, obj)
    keys.push(key)
    vals.push(val)
  })

  t.is(keys.length, 3)

  // loop order isn't guaranteed to be always the same
  var haystack = ['foo', 'bar', 'lorem']
  t.is(keys[0] !== keys[1] && keys[0] !== keys[2], true)
  t.is(contains(haystack, keys[0]), true)
  t.is(contains(haystack, keys[1]), true)
  t.is(contains(haystack, keys[2]), true)

  haystack = [123, true, 'ipsum']
  t.is(vals[0] !== vals[1] && vals[0] !== vals[2], true)
  t.is(contains(haystack, vals[0]), true)
  t.is(contains(haystack, vals[1]), true)
  t.is(contains(haystack, vals[2]), true)
})

test('should fix dont enum bug', function () {
  var obj = {
    'toString': 123,
    'valueOf': true,
    'hasOwnProperty': 'ipsum'
  }

  var keys = []
  var vals = []

  forOwn(obj, function (val, key, o) {
    t.same(o, obj)
    keys.push(key)
    vals.push(val)
  })

  t.is(keys.length, 3)

  var haystack = ['toString', 'valueOf', 'hasOwnProperty']
  t.is(keys[0] !== keys[1] && keys[0] !== keys[2], true)
  t.is(contains(haystack, keys[0]), true)
  t.is(contains(haystack, keys[1]), true)
  t.is(contains(haystack, keys[2]), true)

  haystack = [123, true, 'ipsum']
  t.is(vals[0] !== vals[1] && vals[0] !== vals[2], true)
  t.is(contains(haystack, vals[0]), true)
  t.is(contains(haystack, vals[1]), true)
  t.is(contains(haystack, vals[2]), true)
})

test('should allow custom thisObject', function () {
  var obj = {
    'a': 123,
    'b': true,
    'c': 'ipsum'
  }

  var count = 0

  forOwn(obj, function (val, key, o) {
    t.same(o, obj)
    t.same(this, global)
    count++
  })

  forOwn(obj, function (val, key, o) {
    t.same(o, obj)
    t.same(this, obj)
    count++
  }, obj)

  t.is(count, 6)
})

test('should filter prototype properties', function () {
  var Foo = function () {
    this.lorem = 'ipsum'
  }
  Foo.prototype = {foo: 'bar'}

  var obj = new Foo()

  var keys = []
  var vals = []

  forOwn(obj, function (val, key, o) {
    t.same(o, obj)
    keys.push(key)
    vals.push(val)
  })

  t.same(keys, ['lorem'])
  t.same(vals, ['ipsum'])
})

test('should allow exiting the iteration early. see #94', function () {
  var obj = {
    'a': 123,
    'b': true,
    'c': 'ipsum',
    'd': 456
  }

  var count = 0

  forOwn(obj, function (val, key, o) {
    count++
    if (count === 2) {
      return false
    }
  })

  t.same(count, 2)
})
