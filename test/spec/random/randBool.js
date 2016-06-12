var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randBool')
var t = painless.assert

var randBool = require('../../../src/random/randBool')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function () {
  mockRandom.start([0.6, 0.1, 0.7, 0.51, 0])
})

test.afterEach(function () {
  mockRandom.end()
})

test('should return a random boolean value at each call', function () {
  t.is(randBool(), true)
  t.is(randBool(), false)
  t.is(randBool(), true)
  t.is(randBool(), true)
  t.is(randBool(), false)
})
