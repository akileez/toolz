var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randBit')
var t = painless.assert

var randBit = require('../../../src/random/randBit')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function(){
  mockRandom.start()
})

test.afterEach(function(){
  mockRandom.end()
})

test('should return a random number at each call', function(){
  var a = randBit()
  var b = randBit()

  t.assert(a !== undefined)
  t.ne(a, Infinity)
  t.ne(a, NaN)
  t.ne(a, b)
})

test('shouldn\'t be biased', function () {
  var c1 = 0
  var c0 = 0
  var n = 10
  var rnd

  while (n--) {
    rnd = randBit()
    if ( rnd === 1 ){
      c1++
    } else if ( rnd === 0) {
      c0++
    } else {
       t.is(rnd, 'fail, out of range.')
    }
  }

  t.is(c0, 5)
  t.is(c1, 5)
})
