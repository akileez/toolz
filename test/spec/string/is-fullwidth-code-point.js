var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/is-fullwidth-code-point')
var t = painless.assert

var m = require('../../../src/string/is-fullwidth-code-point')
var codePointAt = require('../../../src/string/code-point-at')

test('testing is-fullwidth-code-point', () => {
  t.true(m(codePointAt('あ')))
  t.true(m(codePointAt('谢')))
  t.true(m(codePointAt('고')))
  t.true(m(0x1f251))
  t.false(m(codePointAt('a')))
})
