var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/reverse')
var t = painless.assert

var reverse = require('../../../src/string/reverse')

test('#reverse', function() {
  t.eq(reverse('foo'), 'oof' )
  t.eq(reverse('foobar'), 'raboof' )
  t.eq(reverse('foo bar'), 'rab oof' )
  t.eq(reverse('saippuakauppias'), 'saippuakauppias' )
  t.eq(reverse(123), '321', 'Non string')
  t.eq(reverse(123.45), '54.321', 'Non string')
  t.eq(reverse(''), '', 'reversing empty string returns empty string' )
  t.eq(reverse(null), '', 'reversing null returns empty string' )
  t.eq(reverse(undefined), '', 'reversing undefined returns empty string' )
})
