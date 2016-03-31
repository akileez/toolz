var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/is-descriptor')

var t = painless.assert

var isDescriptor = require('../../../src/object/is-descriptor-object')
var noop = function () {}

test('should be false when not an object:', function () {
  t.assert(!isDescriptor('a'))
  t.assert(!isDescriptor(null))
  t.assert(!isDescriptor([]))
})

test('should return true if the property exists', function () {
  var obj = {}
  obj.foo = null

  Object.defineProperty(obj, 'bar', {
    value: 'xyz'
  })

  Object.defineProperty(obj, 'baz', {
    get: function () {
    return 'aaa'
  }
  })

  t.assert(isDescriptor(obj, 'foo'))
  t.assert(isDescriptor(obj, 'bar'))
  t.assert(isDescriptor(obj, 'baz'))
})

test('should be false when the object has invalid properties:', function () {
  t.assert(!isDescriptor({value: 'foo', get: noop}))
  t.assert(!isDescriptor({get: noop, value: noop}))
})

test('should be false when the object does not have all valid properties:', function () {
  t.assert(!isDescriptor({value: 'foo', bar: 'baz'}))
  t.assert(!isDescriptor({value: 'foo', bar: 'baz'}))
})

test('should be true when the object has valid properties:', function () {
  t.assert(isDescriptor({value: 'foo', enumerable: true, configurable: true, writable: true}))
  t.assert(isDescriptor({value: noop, enumerable: true, configurable: true, writable: true}))
})

test('should be false when a value is not the correct type:', function () {
  t.assert(!isDescriptor({value: 'foo', enumerable: 'foo'}))
  t.assert(!isDescriptor({value: 'foo', configurable: 'foo'}))
  t.assert(!isDescriptor({value: 'foo', writable: 'foo'}))
})

test('should be false when the object has invalid properties:', function () {
  t.assert(!isDescriptor({get: noop, writable: true}))
  t.assert(!isDescriptor({get: noop, value: true}))
})

test('should not be false when the object has unrecognize properties:', function () {
  t.assert(isDescriptor({get: noop, set: noop, bar: 'baz', enumerable: true, configurable: true}))
})

test('should be false when an accessor is not a function:', function () {
  t.assert(!isDescriptor({get: noop, set: 'baz'}))
  t.assert(!isDescriptor({get: 'foo', set: noop}))
  t.assert(!isDescriptor({get: 'foo', bar: 'baz'}))
  t.assert(!isDescriptor({get: 'foo', set: 'baz'}))
})

test('should be false when "get" is not a function', function () {
  t.assert(!isDescriptor({set: noop}))
  t.assert(!isDescriptor({get: 'foo'}))
})

test('should be false when the object does not have all valid properties:', function () {
  t.assert(!isDescriptor({get: noop, set: noop}))
  t.assert(!isDescriptor({get: noop}))
})

test('should be false when a value is not the correct type:', function () {
  t.assert(!isDescriptor({get: noop, set: noop, enumerable: 'foo'}))
  t.assert(!isDescriptor({set: noop, configurable: 'foo'}))
  t.assert(!isDescriptor({get: noop, configurable: 'foo'}))
})
