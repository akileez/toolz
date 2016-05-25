var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/MAX_INT')
var t = painless.assert

var MAX_INT = require('../../../src/number/MAX_INT')

test('should be equal (2 ^ 31) - 1', function(){
  t.is(MAX_INT, Math.pow(2, 31) - 1)
})
