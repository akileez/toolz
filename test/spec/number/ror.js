var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/ror')
var t = painless.assert

var ror = require('../../../src/number/ror')

test('should rotate bits right', function(){
  t.is(ror( parseInt('10101', 2), 6).toString(2), '10101'+ (new Array(27)).join(0))
  t.is(ror( 1 << 30, 5).toString(2), '1'+ (new Array(26)).join('0'))
})

test('should typecast value to number', function () {
  t.is(ror('2', 30), 8)
  t.is(ror('', 30), 0)
  t.is(ror(null, 30), 0)
  t.is(ror(void(0), 30), 0)
})
