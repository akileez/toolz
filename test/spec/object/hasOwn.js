var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/hasOwn')

var t = painless.assert

var hasOwn = require('../../../src/object/hasOwn')

test('should check if object hasOwnProperty', function () {
  var obj = {
    a: 1,
    b: 'foo'
  }

  t.is(hasOwn(obj, 'a'), true)
  t.is(hasOwn(obj, 'b'), true)
  t.is(hasOwn(obj, 'hasOwnProperty'), false)
  t.is(hasOwn(obj, 'toString'), false)
  t.is(hasOwn(obj, 'toLocaleString'), false)
  t.is(hasOwn(obj, 'valueOf'), false)
  t.is(hasOwn(obj, 'isPrototypeOf'), false)
  t.is(hasOwn(obj, 'propertyIsEnumerable'), false)
  t.is(hasOwn(obj, 'constructor'), false)
})

test('should work even if overwrite prototype properties, including hasOwnProperty', function () {
  var obj = {
    a: 1,
    b: 'foo',
    hasOwnProperty: 'yes',
    toString: 'lorem ipsum'
  }

  t.is(hasOwn(obj, 'a'), true)
  t.is(hasOwn(obj, 'b'), true)
  t.is(hasOwn(obj, 'hasOwnProperty'), true)
  t.is(hasOwn(obj, 'toString'), true)
  t.is(hasOwn(obj, 'toLocaleString'), false)
  t.is(hasOwn(obj, 'valueOf'), false)
  t.is(hasOwn(obj, 'isPrototypeOf'), false)
  t.is(hasOwn(obj, 'propertyIsEnumerable'), false)
  t.is(hasOwn(obj, 'constructor'), false)
})
