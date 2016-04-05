var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/replace-all')
var t = painless.assert

var replaceAll = require('../../../src/string/replace-all')

test('#replaceAll', function(){
  t.eq(replaceAll('a', 'a', 'b'), 'b')
  t.eq(replaceAll('aa', 'a', 'b'), 'bb')
  t.eq(replaceAll('aca', 'a', 'b'), 'bcb')
  t.eq(replaceAll('ccc', 'a', 'b'), 'ccc')
  t.eq(replaceAll('AAa', 'a', 'b'), 'AAb')
  t.eq(replaceAll('Aa', 'a', 'b', true), 'bb')
  t.eq(replaceAll('foo bar foo', 'foo', 'moo'), 'moo bar moo')
  t.eq(replaceAll('foo bar\n foo', 'foo', 'moo'), 'moo bar\n moo')
  t.eq(replaceAll('foo bar FoO', 'foo', 'moo', true), 'moo bar moo')
  t.eq(replaceAll('', 'a', 'b'), '')
  t.eq(replaceAll(null, 'a', 'b'), '')
  t.eq(replaceAll(undefined, 'a', 'b'), '')
  t.eq(replaceAll(12345, 'a', 'b'), 12345)
})
