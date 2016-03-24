var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isArray')
var t = painless.assert

var isArray = require('../../src/lang/isArray')
var isArr = require('../../src/lang/isArray').isArr

test('should detect if value is an Array', function () {
  t.is(isArray([1, 'foo']), true )
  t.is(isArray(new Array(3)), true )

  t.is(isArray(''), false )
  t.is(isArray(123), false )
  t.is(isArray(null), false )
  t.is(isArray({}), false )

  t.is(isArr([1, 'foo']), true )
  t.is(isArr(new Array(3)), true )

  t.is(isArr(''), false )
  t.is(isArr(123), false )
  t.is(isArr(null), false )
  t.is(isArr({}), false )
})