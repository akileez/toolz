var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/has')

var t = painless.assert

var has = require('../../../src/object/has')

test('should check if object has property', function () {
  var obj = {
    a: 1,
    b: 'foo',
    lorem: {
      ipsum: {
        dolor: {
          sit: 'amet'
        }
      }
    }
  }

  t.is(has(obj, 'a'), true)
  t.is(has(obj, 'b'), true)
  t.is(has(obj, 'c'), false)
  t.is(has(obj, 'foo'), false)
  t.is(has(obj, 'lorem.ipsum.dolor'), true)
  t.is(has(obj, 'lorem.ipsum.dolor.sit'), true)
  t.is(has(obj, 'lorem.ipsum.nope.sit'), false)
  t.is(has(obj, 'hasOwnProperty'), true)
  t.is(has(obj, 'toString'), true)
  t.is(has(obj, 'toLocaleString'), true)
  t.is(has(obj, 'valueOf'), true)
  t.is(has(obj, 'isPrototypeOf'), true)
  t.is(has(obj, 'propertyIsEnumerable'), true)
  t.is(has(obj, 'constructor'), true)
})

test('should work even if overwrite prototype properties, including hasOwnProperty', function () {
  var obj = {
    a: 1,
    b: 'foo',
    lorem: {
      ipsum: {
        dolor: {
          sit: 'amet'
        }
      }
    },
    hasOwnProperty: 'yes',
    toString: 'lorem ipsum'
  }

  t.is(has(obj, 'a'), true)
  t.is(has(obj, 'b'), true)
  t.is(has(obj, 'c'), false)
  t.is(has(obj, 'foo.bar.foo'), false)
  t.is(has(obj, 'lorem.ipsum'), true)
  t.is(has(obj, 'lorem.ipsum.nope.amet'), false)
  t.is(has(obj, 'lorem.ipsum.dolor.sit'), true)
  t.is(has(obj, 'hasOwnProperty'), true)
  t.is(has(obj, 'toString'), true)
  t.is(has(obj, 'toLocaleString'), true)
  t.is(has(obj, 'valueOf'), true)
  t.is(has(obj, 'isPrototypeOf'), true)
  t.is(has(obj, 'propertyIsEnumerable'), true)
  t.is(has(obj, 'constructor'), true)
})
