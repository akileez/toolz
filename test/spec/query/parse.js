var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/parse')
var t = painless.assert

var parse = require('../../../src/query/parse')

test('should extract query string from url and parse it', function () {
  var q = parse('http://example.com/?foo=bar&a=123&b=false&c=null')

  t.is(q.foo, 'bar')
  t.is(q.a, 123)
  t.is(q.b, false)
  t.is(q.c, null)
})

test('should allow toggling typecase', function () {
  var q = parse('http://example.com/?foo=bar&a=123&b=false&c=null', false)

  t.is(q.foo, 'bar')
  t.is(q.a, '123')
  t.is(q.b, 'false')
  t.is(q.c, 'null')
})
