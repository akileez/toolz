var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/unesc-html')
var t = painless.assert

var unescapeHtml = require('../../../src/string/unesc-html')

test('should convert &amp;', function () {
  t.eq(unescapeHtml('foo &amp; bar'), 'foo & bar')
})

test('should convert &quot;', function () {
  t.eq(unescapeHtml('&quot;foo&quot;'), '"foo"')
})

test('should convert &gt; and &lt;', function () {
  t.eq(unescapeHtml('&lt;foo&gt;'), '<foo>')
})

test('should convert &#39;', function () {
  t.eq(unescapeHtml('&#39;foo&#39;'), '\'foo\'')
})

test('should accept leading zeros in &#39;', function () {
  t.eq(unescapeHtml('&#0039;foo&#039;'), '\'foo\'')
})

test('should return empty string if no argument', function () {
  t.is(unescapeHtml(), '')
})

test('should treat null as empty string', function () {
  t.is(unescapeHtml(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(unescapeHtml(void 0), '')
})
