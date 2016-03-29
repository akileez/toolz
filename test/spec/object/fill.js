var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/fill')
var t = painless.assert

var fill = require('../../../src/object/fill')

test('should copy missing properties', function () {
  var a = {
    foo : 'bar',
    lorem : 123,
    b : {
      c : 'd'
    }
  }

  var obj = fill({lorem : 'ipsum'}, a)

  t.is( obj.foo, 'bar')
  t.is( obj.lorem, 'ipsum')
  t.same( obj.b, a.b)
})

test('should allow copying properties from multiple objects', function () {
  var obj = fill({lorem : 'ipsum'},
   {foo : 'bar', lorem : 'dolor'},
   {num : 123})

  t.is(obj.foo, 'bar')
  t.is(obj.lorem, 'ipsum')
  t.is( obj.num, 123)
})

test('should not fill in nested arrays', function () {
  var base = {arr : [1,2], b : 'foo'}
  var obj = fill({arr:[null, void(0),'c']}, base)
  t.same(obj, {
    arr : [null, void(0), 'c'],
    b : 'foo'
  })
})
