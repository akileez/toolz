var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/MIN_INT')
var t = painless.assert

var MIN_INT = require('../../../src/number/MIN_INT')

test('should be equal -2 ^ 31', function(){
  t.is(MIN_INT, Math.pow(-2, 31))
})
