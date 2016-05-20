var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/getQuery')
var t = painless.assert

var getQuery = require('../../../src/query/getQuery')

test('should extract query string from url', function () {
  var q = getQuery('http://example.com/?foo=bar&a=123&b=false&c=null')

  t.is(q, '?foo=bar&a=123&b=false&c=null')
})
