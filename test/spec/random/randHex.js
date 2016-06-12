var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randHex')
var t = painless.assert

var randHex = require('../../../src/random/randHex')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function () {
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('should return a random hexadecimal value', function () {
  var a = randHex()
  var b = randHex()

  t.ne(a, b)
})

test('should return a 6 char length hex value by default', function () {
  t.is(randHex().length, 6)
  t.is(randHex(0).length, 6)
})

test('should allow custom length', function () {
  t.is(randHex(2).length, 2)
  t.is(randHex(5).length, 5)
  t.is(randHex(10).length, 10)
})

test('should handle negative size', function () {
  t.is(randHex(-5).length, 6)
})
