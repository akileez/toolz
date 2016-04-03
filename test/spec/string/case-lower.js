var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-lower')
var t = painless.assert

var lowerCase = require('../../../src/string/case-lower')

test('should convert string to lower case', function () {
  t.eq(lowerCase('FOO'), 'foo');
  t.eq(lowerCase('Bar'), 'bar');
  t.eq(lowerCase('ipsum'), 'ipsum');
});

test('should treat null as empty string', function () {
  t.eq(lowerCase(null), '');
});

test('should treat undefined as empty string', function () {
  t.eq(lowerCase(void 0), '');
});
