var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/rol')
var t = painless.assert

var rol = require('../../../src/number/rol')

test('should rotate bits left', function(){
  t.is(rol( parseInt('10101', 2), 5).toString(2), '1010100000' )
  t.is(rol( 1 << 30, 5).toString(2), '1000' )
})

test('should typecast value to number', function () {
  t.is(rol('2', 5).toString(2), '1000000' )
  t.is(rol('', 30).toString(2), '0' )
  t.is(rol(null, 30).toString(2), '0' )
  t.is(rol(void(0), 30).toString(2), '0' )
})
