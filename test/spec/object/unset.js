var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/unset')

var t = painless.assert

var unset = require('../../../src/object/unset')

test('should delete property if existent', function () {
  var obj = {
    foo: {
      bar: 123
    }
  }
  t.is(obj.foo.bar, 123)
  t.is(unset(obj, 'foo.bar'), true)
  var undef
  t.is(obj.foo.bar, undef)
})

test('it should return true if property doesn\'t exist', function () {
  var obj = {}
  t.is(unset(obj, 'dolor.amet'), true)
})

test('shold work even if not nested path', function () {
  var obj = {
    foo: 'bar'
  }
  t.is(obj.foo, 'bar')
  t.is(unset(obj, 'foo'), true)
  var undef
  t.is(obj.foo, undef)
})
