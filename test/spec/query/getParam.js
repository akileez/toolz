var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/getParam')
var t = painless.assert

var getParam = require('../../../src/query/getParam')

test('should parse full URL or query string, get parameter value and typecast by default', function () {
  var query = '?foo=bar&a=123&b=false&c=null'
  var url = 'http://example.com/?foo=bar&a=123&b=false&c=null'

  t.is(getParam(query, 'foo'), 'bar')
  t.is(getParam(query, 'foo'), getParam(url, 'foo'))
  t.is(getParam(query, 'a'), 123)
  t.is(getParam(query, 'a'), getParam(url, 'a'))
  t.is(getParam(query, 'b'), false)
  t.is(getParam(query, 'b'), getParam(url, 'b'))
})

test('should allow toggling the typecast', function () {
  var query = '?foo=bar&a=123&b=false&c=null'
  var url = 'http://example.com/?foo=bar&a=123&b=false&c=null'

  t.is(getParam(query, 'foo', true), 'bar')
  t.is(getParam(query, 'foo', false), 'bar')
  t.is(getParam(query, 'a', true), 123)
  t.is(getParam(query, 'a', false), '123')
  t.is(getParam(query, 'b', true), false)
  t.is(getParam(query, 'b', false), 'false')
})
