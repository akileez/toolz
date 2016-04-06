var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-titleize')
var t = painless.assert

var titleize = require('../../../src/string/case-titleize')

test('#titleize', function(){
  t.eq(titleize('the titleize string method'), 'The Titleize String Method')
  t.eq(titleize('the titleize string  method'), 'The Titleize String  Method')
  t.eq(titleize(''), '', 'Titleize empty string returns empty string')
  t.eq(titleize(null), '', 'Titleize null returns empty string')
  t.eq(titleize(undefined), '', 'Titleize undefined returns empty string')
  t.eq(titleize('let\'s have some fun'), 'Let\'s Have Some Fun')
  t.eq(titleize('a-dash-separated-string'), 'A-Dash-Separated-String')
  t.eq(titleize('A-DASH-SEPARATED-STRING'), 'A-Dash-Separated-String')
  t.eq(titleize(123), '123')
})
