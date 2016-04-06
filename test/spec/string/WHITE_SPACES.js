var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/WHITE_SPACES')
var t = painless.assert

var WHITE_SPACES = require('../../../src/string/WHITE_SPACES')

test('should contain all white space chars', function () {
  t.same(WHITE_SPACES, [
    ' ', '\n', '\r', '\t', '\f', '\v', '\u00A0', '\u1680',
    '\u180E', '\u2000', '\u2001', '\u2002', '\u2003', '\u2004',
    '\u2005', '\u2006', '\u2007', '\u2008', '\u2009', '\u200A',
    '\u2028', '\u2029', '\u202F', '\u205F', '\u3000'
  ])
})
