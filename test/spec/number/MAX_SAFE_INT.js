var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/MAX_SAFE_INT')
var t = painless.assert

var MAX_SAFE_INT = require('../../../src/number/MAX_SAFE_INT')

test('should be equal (2 ^ 52) - 1', function(){
  t.is(MAX_SAFE_INT, Math.pow(2, 53) - 1)
})
