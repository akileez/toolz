var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-dash')
var t = painless.assert

var dash = require('../../../src/string/case-dash')

test('#dasherize', function(){
  t.eq(dash('the_dasherize_string_method'), 'the-dasherize-string-method')
  t.eq(dash('TheDasherizeStringMethod'), 'the-dasherize-string-method')
  t.eq(dash('thisIsATest'), 'this-is-a-test')
  t.eq(dash('this Is A Test'), 'this-is-a-test')
  t.eq(dash('thisIsATest123'), 'this-is-a-test123')
  t.eq(dash('123thisIsATest'), '123this-is-a-test')
  t.eq(dash('the dasherize string method'), 'the-dasherize-string-method')
  t.eq(dash('the  dasherize string method  '), 'the-dasherize-string-method')
  t.eq(dash('téléphone'), 'téléphone')
  t.eq(dash('foo$bar'), 'foo$bar')
  t.eq(dash('input with a-dash'), 'input-with-a-dash')
  t.eq(dash(''), '')
  t.eq(dash(null), '')
  t.eq(dash(undefined), '')
  t.eq(dash(123), '123')
})
