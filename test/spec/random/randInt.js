var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randInt')
var test2 = painless.createGroup('Test random/randInt::random-int')
var t = painless.assert

var randInt = require('../../../src/random/randInt')
var mockRandom = require('../../../src/random/mockRandom')
var isInteger = require('../../../src/number/isInteger')
var inRange = require('../../../src/math/inRange')
var stableFn = require('../../../src/function/stable')

test.beforeEach(function () {
  mockRandom.start()
})

test.afterEach(function () {
  mockRandom.end()
})

test('should return a random number at each call', function () {
  var a = randInt()
  var b = randInt()

  t.assert(a !== undefined)
  t.ne(a, Infinity)
  t.ne(a, NaN)
  t.ne(a, b)
})

test('should return a same number if mix/max are same', function () {
  var a = randInt(1, 1)
  var b = randInt(1, 1)

  t.assert(a !== undefined)
  t.ne(a, Infinity)
  t.ne(a, NaN)
  t.eq(a, b)
})

test('should return a random number inside range', function () {
  var a = randInt(0, 9999)
  var b = randInt(0, 9999)

  t.assert(a < 9999.01)
  t.assert(a > -0.01)
  t.assert(b < 9999.01)
  t.assert(b > -0.01)
  t.ne(a, b)
})

test('shouldn\'t be biased', function () {
  var c1 = 0
  var c_1 = 0
  var c0 = 0
  var n = 10
  var rnd

  while (n--) {
    rnd = randInt(-1, 1)
    if ( rnd === 0) {
      c0++
    } else if ( rnd === 1 ){
      c1++
    } else if ( rnd === -1) {
      c_1++
    } else {
      t.is(rnd, 'fail, out of range.')
    }
  }

  t.assert( c0 < 5)
  t.assert( c0 > 2)
  t.assert( c1 < 5)
  t.assert( c1 > 2)
  t.assert( c_1 < 5)
  t.assert( c_1 > 2)
})

test('shouldn\'t be biased 2', function () {

  var c1 = 0
  var c0 = 0
  var n = 10
  var rnd

  while (n--) {
    rnd = randInt(0, 1)
    if ( rnd === 0) {
      c0++
    } else if ( rnd === 1 ){
      c1++
    } else {
      t.is(rnd, 'fail, out of range.')
    }
  }

  t.is(c0, 5)
  t.is(c1, 5)
})

test2('should pass random-int tests', function () {
  t.true(isInteger(randInt(0, 10)))
  t.false(stableFn(() => randInt(1)))
  t.true(stableFn(() => inRange(randInt(0, 1), 0, 1)))
  t.true(inRange(randInt(0, 1), 0, 1))
})

// console.log(inRange(randInt(1), 0, 1))
// console.log(stableFn(() => inRange(randInt(1), 0, 1)))
// console.log(randInt(1))
