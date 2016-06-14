'use strict'

var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/randUnique')
var t = painless.assert

var randUnique = require('../../../src/random/randUnique')(1, 10)

test('should generate a random number from min to max without the same number in a row', function () {
  var count  = 1000
  var fail = false
  var curr
  var prev

  while (--count > 0) {
    curr = randUnique()
    if (curr === prev || curr > 10 || curr < 1) fail = true

    prev = curr
  }

  t.assert(!fail)
})