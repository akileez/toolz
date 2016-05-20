var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/contains')
var t = painless.assert

var contains = require('../../../src/query/contains')

test('should check if param exists', function () {
  var query = '?foo=bar&a=123&b=false&c=null'
  var url = 'http://example.com/?foo=bar&a=123&b=false&c=null'

  t.is(contains(query, 'foo'), true)
  t.is(contains(url, 'foo'), true)
  t.is(contains(query, 'a'), true)
  t.is(contains(url, 'a'), true)
  t.is(contains(query, 'b'), true)
  t.is(contains(url, 'b'), true)
  t.is(contains(query, 'c'), true)
  t.is(contains(url, 'c'), true)

  t.is(contains(query, 'd'), false)
  t.is(contains(url, 'd'), false)
})
