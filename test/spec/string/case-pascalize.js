var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-pascalize')
var t = painless.assert

var pascalCase = require('../../../src/string/case-pascalize')

test('should convert hyphenated text to camelCase', function () {
  var str = 'lorem-ipsum-dolor'
  t.eq(pascalCase(str), 'LoremIpsumDolor')
})

test('should convert spaces to camelCase', function () {
  var str = '  lorem ipsum  dolor  '
  t.eq(pascalCase(str), 'LoremIpsumDolor')
})

test('should remove non word', function () {
  var str = ' #$  lorem ipsum ^ &:  dolor ++ '
  t.eq(pascalCase(str), 'LoremIpsumDolor')
})

test('should replace accents', function () {
  var str = 'spéçïãl chârs'
  t.eq(pascalCase(str), 'SpecialChars')
})

test('should do it all at once', function () {
  var str = '  %$ & lorem Ipsum @ dolor spéçïãl  ! chârs  )( )  '
  t.eq(pascalCase(str), 'LoremIpsumDolorSpecialChars')
})

test('should treat null as empty string', function () {
  t.is(pascalCase(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(pascalCase(void 0), '')
})
