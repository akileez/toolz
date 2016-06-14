var painless = require('../../assertion/painless')
var test = painless.createGroup('Test random/uniqarr')
var t = painless.assert

var uniqr = require('../../../src/random/uniqarr')

test('should iterate throw array item never returning the same index twice', function () {
  var rand = uniqr([1, 2, 3, 4])
  var curr
  var prev
  var i = 100

  while (i--) {
    curr = rand()
    t.not(curr, prev)
    prev = curr
  }
})