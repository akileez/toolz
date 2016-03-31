var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/is-descriptor-data')

var t = painless.assert

var isDescriptor = require('../../../src/object/is-descriptor-data')
var noop = function () {}

test('should be false when not an object:', function () {
  t.assert(!isDescriptor('a'));
  t.assert(!isDescriptor(null));
  t.assert(!isDescriptor([]));
});

test('should be false when the object has invalid properties:', function () {
  t.assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
  t.assert(!isDescriptor({ value: 'foo', bar: 'baz' }));
  t.assert(!isDescriptor({ value: 'foo', get: noop }));
  t.assert(!isDescriptor({ get: noop, value: noop }));
});

test('should be true when the object has valid data-descriptor properties', function () {
  t.assert(!isDescriptor({ value: 'foo' }));
  t.assert(!isDescriptor({ value: noop }));
});

test('should be false when valid properties are invalid types', function () {
  t.assert(!isDescriptor({ value: 'foo', enumerable: 'foo' }));
  t.assert(!isDescriptor({ value: 'foo', configurable: 'foo' }));
  t.assert(!isDescriptor({ value: 'foo', writable: 'foo' }));
});

test('should be true when a value is a valid data descriptor', function () {
  t.assert(!isDescriptor({ value: 'foo' }));
  t.assert(!isDescriptor({ writable: true }));
  t.assert(!isDescriptor({ value: 'foo', get: 'foo' }));
});

test('should be false when the value is not a valid descriptor', function () {
  t.assert(!isDescriptor('foo'));
  t.assert(!isDescriptor({}));
  t.assert(!isDescriptor({ configurable: true }));
  t.assert(!isDescriptor({ enumerable: true }));
  t.assert(!isDescriptor({
    get: undefined,
    set: undefined,
    enumerable: true,
    configurable: true
  }));
});

test('should be true when the value is a valid descriptor and object has valid descriptor-data properties', function () {
  t.assert(isDescriptor({
    val: undefined,
    writable: true,
    enumerable: true,
    configurable: true
  }));
});

test('should test for a property if given', function () {
  t.assert(isDescriptor({value: 1, writable: true, enumerable: true, configurable: true}, 'writable'))
})
