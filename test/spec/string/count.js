var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/count')
var t = painless.assert

var count = require('../../../src/string/count')

test('#count', function(){
  t.eq(count('Hello world', 'l'), 3)
  t.eq(count('Hello world', 'Hello'), 1)
  t.eq(count('Hello world', 'foo'), 0)
  t.eq(count('x.xx....x.x', 'x'), 5)
  t.eq(count('', 'x'), 0)
  t.eq(count(null, 'x'), 0)
  t.eq(count(undefined, 'x'), 0)
  t.eq(count(12345, 1), 1)
  t.eq(count(11345, 1), 2)
  t.eq(count('Hello World', ''), 0)
  t.eq(count('Hello World', null), 0)
  t.eq(count('Hello World', undefined), 0)
  t.eq(count('', ''), 0)
  t.eq(count(null, null), 0)
  t.eq(count(undefined, undefined), 0)
})
