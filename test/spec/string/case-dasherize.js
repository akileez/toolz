var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-dasherize')
var t = painless.assert

var dasherize = require('../../../src/string/case-dasherize')

test('#dasherize', function(){
  t.eq(dasherize('the_dasherize_string_method'), 'the-dasherize-string-method')
  t.eq(dasherize('TheDasherizeStringMethod'), '-the-dasherize-string-method')
  t.eq(dasherize('thisIsATest'), 'this-is-a-test')
  t.eq(dasherize('this Is A Test'), 'this-is-a-test')
  t.eq(dasherize('thisIsATest123'), 'this-is-a-test123')
  t.eq(dasherize('123thisIsATest'), '123this-is-a-test')
  t.eq(dasherize('the dasherize string method'), 'the-dasherize-string-method')
  t.eq(dasherize('the  dasherize string method  '), 'the-dasherize-string-method')
  t.eq(dasherize('téléphone'), 'téléphone')
  t.eq(dasherize('foo$bar'), 'foo$bar')
  t.eq(dasherize('input with a-dash'), 'input-with-a-dash')
  t.eq(dasherize(''), '')
  t.eq(dasherize(null), '')
  t.eq(dasherize(undefined), '')
  t.eq(dasherize(123), '123')
})
