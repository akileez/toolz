var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randBytes')
var t = painless.assert

var rng = require('../../../src/random/randBytes')

test('random bytes', function () {
  var expected = rng()
  var other = rng()

  t.is(expected.toString('hex').length, 32)
  t.not(expected, other)
})
