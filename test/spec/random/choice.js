var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/choice')
var test2 = painless.createGroup('Test random/choice::random-item')
var t = painless.assert

var choice = require('../../../src/random/choice')
var mockRandom = require('../../../src/random/mockRandom')
var contains = require('../../../src/array/contains')
var stableFn = require('../../../src/function/stable')

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

var fix = ['a', 'b', 'c', 'd', 'e']

test2('should pass random-item tests', function () {
  t.false(stableFn(() => choice(fix)))

  for (var i = 0; i < 1000; i++) {
    t.is(typeof choice(fix), 'string')
  }
})
