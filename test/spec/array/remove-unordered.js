var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/remove-unordered')
var t = painless.assert

var remove = require('../../src/array/remove-unordered')

test('remove', function () {
  var list = [0, 1, 2]
  remove(list, 1)
  t.same(list.sort(), [0, 2])
  remove(list, 0)
  t.same(list.sort(), [2])
  remove(list, 0)
  t.same(list, [])
})

test('out of bounds', function () {
  var list = [0, 1, 2]
  remove(list, 42)
  t.same(list, [0, 1, 2])
})