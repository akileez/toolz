var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/esc-unicode')
var t = painless.assert

var escapeUnicode = require('../../../src/string/esc-unicode')

test('should escape only especial chars by default', function () {
  t.is(escapeUnicode('before éãôø after éãôø'), 'before \\u00e9\\u00e3\\u00f4\\u00f8 after \\u00e9\\u00e3\\u00f4\\u00f8')
})

test('should work with empty strings', function () {
  t.is(escapeUnicode(''), '')
})

test('should allow escaping everything', function () {
  t.eq(escapeUnicode('føo bår', true), '\\u0066\\u00f8\\u006f\\u0020\\u0062\\u00e5\\u0072')
})

test('should treat null as empty string', function () {
  t.is(escapeUnicode(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(escapeUnicode(void 0), '')
})
