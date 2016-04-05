var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/unesc-unicode')
var t = painless.assert

var unescapeUnicode = require('../../../src/string/unesc-unicode')

test('should unescape unicode chars', function () {
  t.is(unescapeUnicode('before \\u00e9\\u00e3\\u00f4\\u00f8 after \\u00e9\\u00e3\\u00f4\\u00f8'), 'before éãôø after éãôø')
})

test('should not affect regular chars or non-unicode scapes', function () {
  t.is(unescapeUnicode('foo \n bar \t \\x45'), 'foo \n bar \t \\x45')
})

test('should work with empty strings and null', function () {
  t.is(unescapeUnicode(''), '')
  t.is(unescapeUnicode(), '')
})

test('should treat null as empty string', function () {
  t.is(unescapeUnicode(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(unescapeUnicode(void 0), '')
})

test('should work with escaped printable ASCII chars as well', function () {
  t.is(unescapeUnicode('\\u0066\\u00f8\\u006f\\u0020\\u0062\\u00e5\\u0072'), 'føo bår')
})
