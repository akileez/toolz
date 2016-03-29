var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/forIn')

var t = painless.assert

var forIn = require('../../../src/object/forIn')
var contains = require('../../../src/array/contains')

test('should loop through all properties', function () {
  var obj = {
    foo: 123,
    bar: true,
    lorem: 'ipsum'
  }

  var keys = []
  var vals = []

  forIn(obj, function (val, key, o) {
    t.same(o, obj)
    keys.push(key)
    vals.push(val)
  })

  t.same(keys, ['foo', 'bar', 'lorem'])
  t.same(vals, [123, true, 'ipsum'])
})

test('should enumerate special properties when defined', function () {
  var obj = {
    constructor: 'foo',
    toString: 'bar',
    hasOwnProperty: true
  }

  var keys = []

  forIn(obj, function (value, key) {
    keys.push(key)
  })

  t.is(keys.length, 3)
  t.is(contains(keys, 'constructor'), true)
  t.is(contains(keys, 'toString'), true)
  t.is(contains(keys, 'hasOwnProperty'), true)
})

test('grab all enumerable properties, including inherited ones', function () {
  function Foo () {
    this.bar = true
  }

  Foo.prototype.dolor = 'amet'
  Foo.prototype.toString = function () {
    return '[Foo bar: ' + this.bar + ']'
  }

  var obj = new Foo()
  var keys = []
  var values = []

  forIn(obj, function (value, key, o) {
    keys.push(key)
    values.push(value)
    t.same(o, obj)
  })

  // loop order isn't guaranteed to be always the same
  t.is(keys.length, 3)
  t.is(contains(keys, 'bar'), true)
  t.is(contains(keys, 'dolor'), true)
  t.is(contains(keys, 'toString'), true)
  t.is(values.length, 3)
  t.is(contains(values, true), true)
  t.is(contains(values, 'amet'), true)
  t.is(contains(values, Foo.prototype.toString), true)
})

test('should allow custom thisObject', function () {
  var obj = {
    'a': 123,
    'b': true,
    'c': 'ipsum'
  }

  var count = 0

  forIn(obj, function (val, key, o) {
    t.same(o, obj)
    t.same(this, global)
    count++
  })

  forIn(obj, function (val, key, o) {
    t.same(o, obj)
    t.same(this, obj)
    count++
  }, obj)

  t.is(count, 6)
})

test('should allow exiting the iteration early. see #94', function () {
  var obj = {
    'a': 123,
    'b': true,
    'c': 'ipsum',
    'd': 456
  }

  var count = 0

  forIn(obj, function (val, key, o) {
    count++
    if (count === 2) {
      return false
    }
  })

  t.is(count, 2)
})
