var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randString')
var t = painless.assert

var randString = require('../../../src/random/randString')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function () {
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('should return a string.', function () {
  t.is(typeof randString(), 'string')
})

test('should default to 8 characters.', function () {
  t.is(randString().length, 8)
})

test('should allow for user specified lengths.', function () {
  t.is(randString(10).length, 10)
})

test('should default on invalid lengths.', function () {
  t.is(randString(0).length, 8)
  t.is(randString("").length, 8)
  t.is(randString(false).length, 8)
  t.is(randString(-1).length, 8)
})

test('should return a base62 subset of characters by default.', function () {
  t.matches(randString(), /[a-zA-Z0-9]*/)
})

test('should use default dictionary if an invalid one is provided.', function () {
  t.matches(randString(4, null), /[a-zA-Z0-9]{4}/)
  t.matches(randString(4, ''), /[a-zA-Z0-9]{4}/)
})

test('should use a provided dictionary.', function () {
  t.matches(randString(4, 'ab'), /[ab]{4}/)
  t.matches(randString(4, 'Random'), /[Random]{4}/)
})

test('should generate a "random" string.', function () {
  t.isnt(randString(), randString())
  t.isnt(randString(4), randString(4))
  t.isnt(randString(16, 'ab'), randString(16, 'ab'))
})
