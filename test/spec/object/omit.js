var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/omit')

var t = painless.assert

var omit = require('../../../src/object/omit')

test('should remove all specified properties', function () {
  var obj = {
    foo: 1,
    bar: 2,
    lorem: 3
  }
  var result = omit(obj, 'foo', 'lorem')
  t.same(result, {bar: 2})
})

test('should allow passing keys that should be removed as array', function () {
  var obj = {
    a: false, // test for falsy value
    b: 'bar',
    toString: 'dolor' // test don't enum bug on IE
  }
  var result = omit(obj, ['a', 'toString'])
  t.same(result, {b: 'bar'})
})
