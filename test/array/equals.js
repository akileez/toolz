var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test array/equals')
var t = painless.assert
var equals = require('../../src/array/equals')

test('should check if array contains same elements', () => {
  t.is(equals([1, 2], [1, 2]), true)
  t.is(equals([2, 1], [1, 2]), false)
  t.is(equals([1, 2, 3], [1, 2]), false)
  t.is(equals([1, 3, 3], [1, 2, 4]), false)
})

test('should consider empty arrays as equal', () => {
  t.is(equals([], []), true)
})

test('should allow custom compare functions', function () {
  var a = [1, 'bar', {}]
  var b = ['1', 'bar', {}]

  var compare = function(a, b) {
    return String(a) === String(b)
  }

  t.is(equals(a, b, compare), true)
})
