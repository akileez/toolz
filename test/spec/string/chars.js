var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/chars')
var t = painless.assert

var chars = require('../../../src/string/chars')

test('#chars', function() {
  t.eq(chars('Hello').length, 5)
  t.eq(chars(123).length, 3)
  t.eq(chars('').length, 0)
  t.eq(chars(null).length, 0)
  t.eq(chars(undefined).length, 0)
})
