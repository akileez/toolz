var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/repeat-str')
var t = painless.assert

var repeat = require('../../../src/string/repeat-str')

test('#repeat', function() {
  t.eq(repeat('foo'), '')
  t.eq(repeat('foo',1), 'foo')
  t.eq(repeat('foo',2), 'foofoo')
  t.eq(repeat('foo', 3), 'foofoofoo')
  t.eq(repeat('foo', '3'), 'foofoofoo')
  t.eq(repeat(123, 2), '123123')
  t.eq(repeat(true, 2), 'truetrue')
  t.eq(repeat(false, 2), 'falsefalse')
  // t.eq(repeat(1234, 2, '*'), '1234*1234')
  // t.eq(repeat(1234, 2, 5), '123451234')
  t.eq(repeat('', 2), '')
  t.eq(repeat(null, 2), '')
  t.eq(repeat(undefined, 2), '')
})