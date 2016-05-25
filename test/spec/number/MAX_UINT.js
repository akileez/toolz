var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/MAX_UINT')
var t = painless.assert

var MAX_UINT = require('../../../src/number/MAX_UINT')

test('should be equal (2 ^ 32) - 1', function(){
  t.is(MAX_UINT, Math.pow(2, 32) - 1)
})
