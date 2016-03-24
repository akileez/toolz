var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/values')
var t = painless.assert

var values = require('../../src/array/values')

test('should get values from array of objects', () => {
  var arr = [{a: 1, b: 2}, {a: 'foo', b: 'baz'}, {c: true, d: false}]

  t.same(values(arr, 'a'), [1, 'foo'])
  t.same(values(arr, 'b'), [2, 'baz'])
  t.same(values(arr, 'c'), [true])
})