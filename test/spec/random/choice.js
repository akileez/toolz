var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/choice')
var t = painless.assert

var choice = require('../../../src/random/choice')
var mockRandom = require('../../../src/random/mockRandom')
var contains = require('../../../src/array/contains')

test.beforeEach(function () {
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('should pick a random argument', function () {
  var choices = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
  var a = choice.apply(null, choices)
  var b = choice.apply(null, choices)

  t.true(contains(choices, a))
  t.true(contains(choices, b))
  t.isnt(a, b)
})

test('should work with array', function () {
  var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  var a = choice(arr)
  var b = choice(arr)

  t.true(contains(arr, a))
  t.true(contains(arr, b))
  t.isnt(a, b)
})
