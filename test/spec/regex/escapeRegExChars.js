var painless = require('../../assertion/painless')
var test = painless.createGroup('Test regex/escapeRegExChars')
var t = painless.assert

var escre = require('../../../src/regex/escapeRegExChar')

test('should escape RegEx special characters', function () {
	var result = escre('\\ ^ $ * + ? . ( ) | { } [ ]')
	var expected = '\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]'

  t.eq(result, expected)
})

test('should escape RegEx special characters human english', function () {
	var result = escre('how much $ for a unicorn?')
	var expected = 'how much \\$ for a unicorn\\?'

  t.eq(result, expected)
})

test('should assert error if string is not entered', function () {
  t.throws(() => escre(1))
  t.throws(() => escre([]))
  t.throws(() => escre({}))
  t.throws(() => escre(false))
  t.throws(() => escre(undefined))
  t.throws(() => escre(null))
  t.throws(() => escre(new Date()))
})
