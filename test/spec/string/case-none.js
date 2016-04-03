var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-none')
var t = painless.assert

var none = require('../../../src/string/case-none')

test('shouldnt touch space case', function () {
  t.eq(none('this is a string'), 'this is a string')
})

test('should remove camel case', function () {
  t.eq(none('thisIsAString'), 'this is a string')
})

test('should remove constant case', function () {
  t.eq(none('THIS_IS_A_STRING'), 'this is a string')
})

test('should not split upper case', function () {
  t.eq(none('UPPERCASE'), 'uppercase')
})

test('should not split lower case', function () {
  t.eq(none('lowercase'), 'lowercase')
})

test('should remove pascal case', function () {
  t.eq(none('ThisIsAString'), 'this is a string')
})

test('should handle single letter first words', function () {
  t.eq(none('AStringIsThis'), 'a string is this')
})

test('should handle single letter first words with two words', function () {
  t.eq(none('AString'), 'a string')
})

test('should remove slug case', function () {
  t.eq(none('this-is-a-string'), 'this is a string')
})

test('should remove snake case', function () {
  t.eq(none('this_is_a_string'), 'this is a string')
})

test('should remove sentence case', function () {
  t.eq(none('This is a string.'), 'this is a string.')
})

test('should remove title case', function () {
  t.eq(none('This: Is a String'), 'this: is a string')
})

test('should remove casing but preserve characters', function () {
  t.eq(none('RAnDom -junk$__loL!'), 'random -junk$__lol!')
})

test('should return identical string', function () {
  t.eq(none('ارژنگ'), 'ارژنگ')
})
