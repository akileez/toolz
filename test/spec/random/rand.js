var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/rand')
var t = painless.assert

var rand = require('../../../src/random/rand')
var mockRandom = require('../../../src/random/mockRandom')

test.beforeEach(function(){
  mockRandom.start()
})

test.afterEach(function() {
  mockRandom.end()
})

test('returns a rand number at each call', function () {
  var a = rand()
  var b = rand()

  t.assert(a !== undefined)
  t.ne(a, Infinity)
  t.ne(a, b)
})

test('returns a rand number inside range', function () {
  var a = rand(0, 9999)
  var b = rand(0, 9999)

  t.assert(a < 9999.01)
  t.assert(a > -0.01)
  t.assert(b < 9999.01)
  t.assert(b > -0.01)
  t.ne(a, b)
})

