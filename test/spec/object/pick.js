var painless = require('../../assertion/painless')
var test = painless.createGroup('Test object/pick')

var t = painless.assert

var pick = require('../../../src/object/pick')

test('should keep only desired properties', function () {
  var obj = {
    foo: 1,
    bar: 2,
    lorem: 3
  }
  var result = pick(obj, 'foo', 'lorem')
  t.same(result, {foo: 1, lorem: 3})
})

test('should allow passing keys as array', function () {
  var obj = {
    a: false, // test for falsy value
    b: 'bar',
    toString: 'dolor' // test don't enum bug on IE
  }
  var result = pick(obj, ['a', 'toString'])
  t.same(result, {a: false, toString: 'dolor'})
})
