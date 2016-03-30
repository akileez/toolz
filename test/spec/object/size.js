var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/size')

var t = painless.assert

var size = require('../../../src/object/size')
// var collection = require('../../../src/collection/size')

test('should get object size', function () {
  var obj = {
    foo: 123,
    bar: true,
    lorem: 'ipsum'
  }

  var s = size(obj)

  t.is(s, 3)
})

test('should avoid dont enum bugs', function () {
  var obj = {
    'toString': 123,
    'valueOf': true,
    'hasOwnProperty': 'ipsum'
  }

  var s = size(obj)

  t.is(s, 3)
})

test('should not count prototype properties', function () {
  var Foo = function () {
    this.lorem = 'ipsum'
  }
  Foo.prototype = {foo: 'bar'}

  var obj = new Foo()

  t.is(obj.lorem, 'ipsum')
  t.is(obj.foo, 'bar')
  t.is(size(obj), 1)
})
