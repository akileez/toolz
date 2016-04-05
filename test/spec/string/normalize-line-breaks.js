var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/normalize-line-breaks')
var t = painless.assert

var normalizeLineBreaks = require('../../../src/string/normalize-line-breaks')

test('should convert line breaks to the same standard.', function () {
  var str = 'foo\nbar\r\nlorem\ripsum'

  t.eq(/\r\n/.test(str), true)
  t.eq(/\r/.test(str), true)
  t.eq(/\n/.test(str), true)

  str = normalizeLineBreaks(str)

  t.eq(/\r\n/.test(str), false)
  t.eq(/\r/.test(str), false)
  t.eq(/\n/.test(str), true)
})

test('should allow custom line break.', function () {
  var str = 'foo\nbar\r\nlorem\ripsum'

  t.eq(/\r\n/.test(str), true)
  t.eq(/\r/.test(str), true)
  t.eq(/\n/.test(str), true)

  str = normalizeLineBreaks(str, '\r')

  t.eq(/\r\n/.test(str), false)
  t.eq(/\r/.test(str), true)
  t.eq(/\n/.test(str), false)
  t.eq(/-/.test(str), false)

  str = normalizeLineBreaks(str, '-')

  t.eq(/\r\n/.test(str), false)
  t.eq(/\r/.test(str), false)
  t.eq(/\n/.test(str), false)
  t.eq(/-/.test(str), true)
})

test('should treat null as empty string', function () {
  t.is(normalizeLineBreaks(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(normalizeLineBreaks(void 0), '')
})
