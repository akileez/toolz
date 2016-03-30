var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/update')

var t = painless.assert

var update = require('../../../src/object/update')

test('should only update existing props', function () {
  var a = {
    foo : 'bar',
    lorem : 'ipsum',
    b : {
      c : 'd'
    }
  }

  var obj = update({lorem : 123}, a)

  t.is( obj.foo, undefined)
  t.is( obj.lorem, 'ipsum')
  t.same( obj.b, undefined)
})

test('should allow updates from multiple objects', function () {
  var a = {
    foo : 'baz',
    lorem : 123,
    b : {
      c : 'd'
    }
  }
  var obj = update(a, {lorem : 'ipsum'},
   {foo : 'bar', lorem : 'dolor'},
   {num : 123})

  t.is(obj.foo, 'bar')
  t.is(obj.lorem, 'dolor')
  t.is( obj.num, undefined)
})