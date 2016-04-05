var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/quote')
var t = painless.assert

var quote = require('../../../src/string/quote')

test('#quote', function(){
  t.eq(quote('foo'), '"foo"');
  t.eq(quote('"foo"'), '""foo""');
  t.eq(quote(1), '"1"');
  t.eq(quote('foo', '\''), '\'foo\'');
  t.eq(quote('foo'), '"foo"');
  t.eq(quote(''), '""');
  t.eq(quote(null), '""');
  t.eq(quote(undefined), '""');
});