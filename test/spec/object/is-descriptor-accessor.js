var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/is-descriptor-accessor')

var t = painless.assert

var isDescriptor = require('../../../src/object/is-descriptor-accessor')
var noop = function(){};

test('should be false when not an object:', function () {
  t.assert(!isDescriptor('a'));
  t.assert(!isDescriptor(null));
  t.assert(!isDescriptor([]));
});

test('should be false when the object has data descriptor properties:', function () {
  t.assert(!isDescriptor({ get: noop, writable: true }));
  t.assert(!isDescriptor({ get: noop, value: true }));
});

test('should be false when unrecognized properties are defined:', function () {
  t.assert(!isDescriptor({ get: noop, foo: true }));
  t.assert(!isDescriptor({ get: noop, bar: true }));
  // except here where everything else is set accordingly
  t.assert(isDescriptor({ get: noop, bar: true, configurable: false, enumerable: true }));
});

test('should be false when a get or set are not functions:', function () {
  t.assert(!isDescriptor({ get: noop, set: 'baz' }));
  t.assert(!isDescriptor({ get: 'foo', set: noop }));
  t.assert(!isDescriptor({ get: 'foo', bar: 'baz' }));
  t.assert(!isDescriptor({ get: 'foo', set: 'baz' }));
  t.assert(!isDescriptor({ get: 'foo' }));
});

test('should be false when "get" is not defined:', function () {
  t.assert(!isDescriptor({ set: noop }));
});

test('should be false when the object has some valid properties:', function () {
  t.assert(!isDescriptor({ get: noop, set: noop }));
  t.assert(!isDescriptor({ get: noop }));
});

test('should be false when a value is not the correct type:', function () {
  t.assert(!isDescriptor({ get: noop, set: noop, enumerable: 'foo' }));
  t.assert(!isDescriptor({ set: noop, configurable: 'foo' }));
  t.assert(!isDescriptor({ get: noop, configurable: 'foo' }));
});

test('should be true when the object has valid properties aand values are the correct type:', function () {
  t.assert(isDescriptor({ get: noop, set: noop, enumerable: true, configurable: true }));
  t.assert(isDescriptor({ get: noop, configurable: true, enumerable: true }));
  t.assert(isDescriptor({ get: noop, configurable: false, enumerable: true }));
});

test('should test for a property if given', function () {
  t.assert(isDescriptor({get: noop, enumerable: true, configurable: true}, 'get'))
})