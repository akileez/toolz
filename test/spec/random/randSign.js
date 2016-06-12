var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randSign')
var t = painless.assert

var randSign = require('../../../src/random/randSign')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function () {
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('returns a random number at each call', function () {
  var a = randSign()
  var b = randSign()

  t.assert(a !== undefined)
  t.ne(a, Infinity)
  t.ne(a, NaN)
  t.ne(a, b)
})

test('shouldn\'t be biased', function () {
  var c1 = 0
  var c_1 = 0
  var n = 10
  var rnd

  while (n--) {
    rnd = randSign()
    if (rnd === 1) {
      c1++
    } else if (rnd === -1) {
      c_1++
    } else {
      t.is(rnd, 'fail, out of range.')
    }
  }

  t.is(c_1, 5)
  t.is(c1, 5)
})
