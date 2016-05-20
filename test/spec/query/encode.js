var painless = require('../../assertion/painless')
var test = painless.createGroup('Test query/encode')
var t = painless.assert

var encode = require('../../../src/query/encode')

test('should convert simple object into query string.', function () {
  var q = {
    a : 123,
    b : false,
    c : null,
    d : 'bar'
  }
  t.is(encode(q), '?a=123&b=false&c=null&d=bar')
})

test('should encode special chars', function () {
  var q = {
    a : 'bar',
    b : 'lorem ipsum',
    c : 'spéçîãl çhârs'
  }
  t.is(encode(q), '?a=bar&b=lorem%20ipsum&c=sp%C3%A9%C3%A7%C3%AE%C3%A3l%20%C3%A7h%C3%A2rs')
})

test('should run through Array values.', function () {
  var q = {
    a : 'foo',
    b : [0, false, null, undefined, 'spéçîãl çhârs'],
    c : [],
    e : ['', '', 'foo'],
    'blob-name' : ['loren', 'ipsun']
  }
  t.is(encode(q), '?a=foo&b=0&b=false&b=null&b=undefined&b=sp%C3%A9%C3%A7%C3%AE%C3%A3l%20%C3%A7h%C3%A2rs&c=&e=&e=&e=foo&blob-name=loren&blob-name=ipsun')
})
