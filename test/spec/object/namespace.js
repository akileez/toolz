var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/namespace')

var t = painless.assert

var namespace = require('../../../src/object/namespace')

test('should create nested properties if not existent and return the created object', function () {
  var o = {}
  namespace(o, 'foo.bar')
  t.same(o.foo, {bar: {}})
  t.same(o.foo.bar, {})
})

test('should return an empty object', function () {
  t.same(namespace({}, 'foo.bar'), {})
})

test('should reuse existing objects', function () {
  var o = {
    foo: {
      lorem: 'ipsum'
    }
  }

  var f = o.foo

  t.same(namespace(o, 'foo.bar'), {})
  t.same(o.foo, f)
  t.same(o.foo.lorem, 'ipsum')
})

test('should return original object if no path', function () {
  var obj = {}
  t.same(namespace(obj), obj)
  t.same(namespace(obj, ''), obj)
  t.same(namespace(obj, null), obj)
})

test('shouldn\'t overwrite existing object', function () {
  var obj = {
    foo: {
      bar: {
        val: 123
      }
    }
  }

  var foo = obj.foo

  t.same(namespace(obj, 'foo.bar'), foo.bar)
})
