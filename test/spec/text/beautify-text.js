var painless = require('../../assertion/painless')
var test = painless.createGroup('Test text/beautify-text')
var t = painless.assert

var fn = require('../../../src/text/beautify-text')

test('some beautiful marks', () => {
  t.is(fn('a -- b'), 'a \u2013 b')
  t.is(fn('a -- b'), 'a \u2013 b')
  t.is(fn('a --- b (tm) c'), 'a \u2014 b ™ c')
  t.is(fn('a --- "b (tm) c"'), 'a \u2014 “b ™ c”')
  t.is(fn('a --- \'b (tm) c\''), 'a \u2014 ‘b ™ c’')
  t.is(fn('he\'s neat'), 'he\u2019s neat')
})