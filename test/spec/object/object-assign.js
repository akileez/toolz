var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/object-assign')

var t = painless.assert

var objectAssign = require('../../../src/object/object-assign')

test('should have the correct length', function () {
  t.eq(objectAssign.length, 2)
})

test('should not throw when target is not an object', function () {
  t.throws(function () {
    objectAssign(null)
  }, TypeError)
  t.throws(function () {
    objectAssign(undefined)
  }, TypeError)
})

test('should objectAssign own enumerable properties from source to target object', function () {
  t.same(objectAssign({foo: 0}, {bar: 1}), {foo: 0, bar: 1})
  t.same(objectAssign({foo: 0}, null, undefined), {foo: 0})
  t.same(objectAssign({foo: 0}, null, undefined, {bar: 1}, null), {foo: 0, bar: 1})
})

test('should throw on null/undefined target', function () {
  t.throws(function () {
    objectAssign(null, {})
  })

  t.throws(function () {
    objectAssign(undefined, {})
  })

  t.throws(function () {
    objectAssign(undefined, undefined)
  })
})

test('should not throw on null/undefined sources', function () {
  t.doesNotThrow(function () {
    objectAssign({}, null)
  })

  t.doesNotThrow(function () {
    objectAssign({}, undefined)
  })

  t.doesNotThrow(function () {
    objectAssign({}, undefined, null)
  })
})

test('should support multiple sources', function () {
  t.same(objectAssign({foo: 0}, {bar: 1}, {bar: 2}), {foo: 0, bar: 2})
  t.same(objectAssign({}, {}, {foo: 1}), {foo: 1})
})

test('should only iterate own keys', function () {
  var Unicorn = function () {}
  Unicorn.prototype.rainbows = 'many'
  var unicorn = new Unicorn()
  unicorn.bar = 1

  t.same(objectAssign({foo: 1}, unicorn), {foo: 1, bar: 1})
})

test('should return the modified target object', function () {
  var target = {}
  var returned = objectAssign(target, {a: 1})
  t.eq(returned, target)
})

test('should support `Object.create(null)` objects', function () {
  var obj = Object.create(null)
  obj.foo = true
  t.same(objectAssign({}, obj), {foo: true})
})

test('should preserve property order', function () {
  var letters = 'abcdefghijklmnopqrst'
  var source = {}
  letters.split('').forEach(function (letter) {
    source[letter] = letter
  })
  // console.log(source)
  var target = objectAssign({}, source)
  // var target = extend({}, source)
  // console.log(target)
  t.eq(Object.keys(target).join(''), letters)
})

test('should support symbol properties', function () {
  var target = {}
  var source = {}
  var sym = Symbol('foo')
  source[sym] = 'bar'
  objectAssign(target, source)
  t.eq(target[sym], 'bar')
})

test('should only copy enumerable symbols', function () {
  var target = {}
  var source = {}
  var sym = Symbol('foo')
  Object.defineProperty(source, sym, {
    enumerable: false,
    value: 'bar'
  })
  objectAssign(target, source)
  t.eq(target[sym], undefined)
})

