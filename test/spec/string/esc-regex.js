var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/esc-regex')
var t = painless.assert

var escregex = require('../../../src/string/esc-regex')

test('#escregex', function(){
  t.eq(escregex(/hello(?=\sworld)/.source), 'hello\\(\\?\\=\\\\sworld\\)', 'with lookahead')
  t.eq(escregex(/hello(?!\shell)/.source), 'hello\\(\\?\\!\\\\shell\\)', 'with negative lookahead')
})
