var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/string-width')
var t = painless.assert

var fn = require('../../../src/string/string-width')

test('tests for string-width', () => {
  t.is(fn('abcde'), 5)
  t.is(fn('古池や'), 6)
  t.is(fn('あいうabc'), 9)
  t.is(fn('ノード.js'), 9)
  t.is(fn('你好'), 4)
  t.is(fn('안녕하세요'), 10)
  t.is(fn('A\ud83c\ude00BC'), 5, 'surrogate')
  t.is(fn('\u001b[31m\u001b[39m'), 0)
})
