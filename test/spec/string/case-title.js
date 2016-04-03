var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-title')
var t = painless.assert

var title = require('../../../src/string/case-title')

test('shouldnt touch title case', function () {
  t.eq(title('A Title: Case of String'), 'A Title: Case of String')
})

test('should convert space case', function () {
  t.eq(title('a space case of string'), 'A Space Case of String')
})

test('should convert camel case', function () {
  t.eq(title('aCamelCaseOfString'), 'A Camel Case of String')
})

test('should convert snake case', function () {
  t.eq(title('a_snake_case_of_string'), 'A Snake Case of String')
})

test('should convert dot case', function () {
  t.eq(title('a.dot.case.of.string'), 'A Dot Case of String')
})

test('should convert constant case', function () {
  t.eq(title('A_CONSTANT_CASE_OF_STRING'), 'A Constant Case of String')
})

test('should convert "the lord of the flies"', function () {
  t.eq(title('the lord of the flies'), 'The Lord of the Flies')
})

test('should convert "a tale of two cities"', function () {
  t.eq(title('a tale of two cities'), 'A Tale of Two Cities')
})

test('should convert "the lion, the witch and the wardrobe"', function () {
  t.eq(title('the lion, the witch and the wardrobe'), 'The Lion, the Witch and the Wardrobe')
})

test('should convert "she: a history of adventure"', function () {
  t.eq(title('she: a history of adventure'), 'She: A History of Adventure')
})
