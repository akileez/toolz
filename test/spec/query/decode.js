var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/decode')
var t = painless.assert

var decode = require('../../../src/query/decode')

test('should decode query string and typecast values', function () {
  var q = decode('?a=123&b=false&c=null&d=bar')
  t.is(q.a, 123)
  t.is(q.b, false)
  t.is(q.c, null)
  t.is(q.d, 'bar')
})

test('should decode special chars', function () {
  var q = decode('?a=bar&b=lorem%20ipsum&c=sp%C3%A9%C3%A7%C3%AE%C3%A3l%20%C3%A7h%C3%A2rs')
  t.is(q.a, 'bar')
  t.is(q.b, 'lorem ipsum')
  t.is(q.c, 'spéçîãl çhârs')
})

test('should allow bypassing the typecast', function () {
  var q = decode('?a=123&b=false&c=null&d=bar', false)
  t.is(q.a, '123')
  t.is(q.b, 'false')
  t.is(q.c, 'null')
  t.is(q.d, 'bar')
})

test('should allow properties with same name and create an array', function () {
  var q = decode('?a=undefined&a=false&a=0&a=null&a=bar&b=123&b=foo&c=loren&d=&d=&d=sp%C3%A9%C3%A7%C3%AE%C3%A3l%20%C3%A7h%C3%A2rs')
  t.same(q.a, [undefined, false, 0, null, 'bar'])
  t.same(q.b, [123, 'foo'])
  t.same(q.c, 'loren')
  t.same(q.d, ['', '', 'spéçîãl çhârs'])
})
