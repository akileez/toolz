var painless = require('../../assertion/painless')
var test = painless.createGroup('Test array/append')
var t = painless.assert

var append = require('../../src/array/append')

test('failing test', () => {
  t.same({a: 1}, {a:1}, 'expact {a: 1} to be {a: 1}')
  t.same({a: 1}, {a:1}, 'bad code')
})
test('append all items of second array to end of first array', function () {
  var arr1 = [1, 2, 3]
  var arr2 = [3, 4, 5]
  var res

  res = append(arr1, arr2)
  t.is(arr1, res)
  t.same(arr1, [1,2,3,3,4,5])
})

test('append null array', function () {
  var arr1 = [1, 2]

  append(arr1, null)
  t.same(arr1, [1, 2])
})

test('append undefined array', function () {
  var arr1 = [1, 2, 3]

  append(arr1, undefined)
  t.same(arr1, [1, 2, 3])
})
