var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/trim-off-newlines')
var t = painless.assert

var trimOffNewlines = require('../../../src/string/trim-off-newlines')

test('should trim off \\r', function () {
  t.is(trimOffNewlines('\runicorns'), 'unicorns')
  t.is(trimOffNewlines('unicorns\r\r'), 'unicorns')
  t.is(trimOffNewlines('unicorns\r'), 'unicorns')
})

test('should trim off \\n', function () {
  t.is(trimOffNewlines('\nunicorns'), 'unicorns')
  t.is(trimOffNewlines('\n\n\n\nunicorns\n\n'), 'unicorns')
  t.is(trimOffNewlines('unicorns\n'), 'unicorns')
})

test('should trim off \\r\\n', function () {
  t.is(trimOffNewlines('\r\n\r\n\r\nunicorns'), 'unicorns')
  t.is(trimOffNewlines('\r\nunicorns\r\n'), 'unicorns')
  t.is(trimOffNewlines('unicorns\r\n\r\n\r\n\r\n\r\n\r\n'), 'unicorns')
})
