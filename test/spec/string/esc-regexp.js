var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/esc-regexp')
var t = painless.assert

var escapeRegExp = require('../../../src/string/esc-regexp')

test('should escape special chars', function () {
  t.eq(escapeRegExp('lorem.ipsum'), 'lorem\\.ipsum')
  t.eq(escapeRegExp("\\.+*?^$[](){}/'#"),
    "\\\\\\.\\+\\*\\?\\^\\$\\[\\]\\(\\)\\{\\}\\/\\'\\#")
})

test('should treat null as empty string', function () {
  t.is(escapeRegExp(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(escapeRegExp(void 0), '')
})
