var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/surround')
var t = painless.assert

var surround = require('../../../src/string/surround')

test('#surround', function(){
  t.eq(surround('foo', 'ab'), 'abfooab')
  t.eq(surround(1, 'ab'), 'ab1ab')
  t.eq(surround(1, 2), '212')
  t.eq(surround('foo', 1), '1foo1')
  t.eq(surround('', 1), '11')
  t.eq(surround(null, 1), '11')
  t.eq(surround('foo', ''), 'foo')
  t.eq(surround('foo', null), 'foo')
})
