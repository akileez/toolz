var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-normalize')
var t = painless.assert

var normalize = require('../../../src/string/case-normalize')

test('underscore.string humanize test', function () {
  t.eq(normalize('the_humanize_string_method'), 'the humanize string method')
  t.eq(normalize('ThehumanizeStringMethod'), 'thehumanize string method')
  t.eq(normalize('-ThehumanizeStringMethod'), 'thehumanize string method')
  t.eq(normalize('the humanize string method'), 'the humanize string method')
  t.eq(normalize('the humanize_id string method_id'), 'the humanize id string method id')
  t.eq(normalize('the  humanize string method  '), 'the humanize string method')
  t.eq(normalize('   capitalize dash-CamelCase_underscore trim  '), 'capitalize dash camel case underscore trim')
  t.eq(normalize(123), '123')
  t.eq(normalize(''), '')
  t.eq(normalize(null), '')
  t.eq(normalize(undefined), '')
})
