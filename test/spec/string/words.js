var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/words')
var t = painless.assert

var words = require('../../../src/string/words')

test('#words', function() {
  t.same(words('I love you!'), ['I', 'love', 'you!'])
  t.same(words(' I    love   you!  '), ['I', 'love', 'you!'])
  t.same(words('I_love_you!', '_'), ['I', 'love', 'you!'])
  t.same(words('I-love-you!', /-/), ['I', 'love', 'you!'])
  t.same(words(123), ['123'], '123 number has one word "123".')
  t.same(words(0), ['0'], 'Zero number has one word "0".')
  t.same(words(''), [], 'Empty strings has no words.')
  t.same(words('   '), [], 'Blank strings has no words.')
  t.same(words(null), [], 'null has no words.')
  t.same(words(undefined), [], 'undefined has no words.')
})