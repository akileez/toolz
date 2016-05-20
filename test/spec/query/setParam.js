var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/setParam')
var t = painless.assert

var setParam = require('../../../src/query/setParam')

test('should add value if it doesn\'t exist', function () {
  t.is(setParam('foo.com', 'bar', true), 'foo.com?bar=true')
  t.is(setParam('foo.com?bar=1', 'ipsum', 'dolor'), 'foo.com?bar=1&ipsum=dolor')
})

test('should encode value', function () {
  t.is(setParam('foo.com?bar=1', 'ipsum', 'dólôr amèt'), 'foo.com?bar=1&ipsum=d%C3%B3l%C3%B4r%20am%C3%A8t')
})

test('should update value if it exists', function () {
  t.is(setParam('foo.com?bar=2', 'bar', false), 'foo.com?bar=false')
  t.is(setParam('foo.com?bar=1&ipsum=dolor%20amet&maecennas=3', 'bar', 'amet'), 'foo.com?bar=amet&ipsum=dolor%20amet&maecennas=3')
})

test('should work with just the query string', function () {
  t.is(setParam('?dolor=amet', 'ipsum', 123), '?dolor=amet&ipsum=123')
  t.is(setParam('?dolor=amet&ipsum=5', 'ipsum', 123), '?dolor=amet&ipsum=123')
  t.is(setParam('?dolor=amet&ipsum=5&maecennas=ullamcor', 'ipsum', 123), '?dolor=amet&ipsum=123&maecennas=ullamcor')
})

test('should work with empty url', function () {
  t.is(setParam('', 'foo', 'bar'), '?foo=bar')
  t.is(setParam('?', 'foo', 'bar'), '?foo=bar')
})
