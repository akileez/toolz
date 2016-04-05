var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/esc-html')
var t = painless.assert

var escapeHtml = require('../../../src/string/esc-html')

test('should convert special chars into entities', function () {
  t.eq(escapeHtml('<em>\'lorem\'</em> & "ipsum"'), '&lt;em&gt;&#39;lorem&#39;&lt;/em&gt; &amp; &quot;ipsum&quot;')
})

test('should treat null as empty string', function () {
  t.is(escapeHtml(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(escapeHtml(void 0), '')
})
