var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-upper')
var t = painless.assert

var upperCase = require('../../../src/string/case-upper')

test('should convert string to lower case', function () {
  t.eq(upperCase('FOO'), 'FOO')
  t.eq(upperCase('Bar'), 'BAR')
  t.eq(upperCase('ipsum'), 'IPSUM')
})

test('should treat null as empty string', function () {
  t.is(upperCase(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(upperCase(void 0), '')
})
