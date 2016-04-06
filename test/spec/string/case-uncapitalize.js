var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-uncapitalize')
var t = painless.assert

var decapitalize = require('../../../src/string/case-uncapitalize')

test('#decapitalize', function() {
  t.eq(decapitalize('Fabio'), 'fabio', 'First letter is lower case')
  t.eq(decapitalize('FOO'), 'fOO', 'Other letters unchanged')
  t.eq(decapitalize(123), '123', 'Non string')
  t.eq(decapitalize(''), '', 'Decapitalizing empty string returns empty string')
  t.eq(decapitalize(null), '', 'Decapitalizing null returns empty string')
  t.eq(decapitalize(undefined), '', 'Decapitalizing undefined returns empty string')
})
