var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-camelize')
var t = painless.assert

var camelCase = require('../../../src/string/case-camelize')

test('should convert hyphenated text to camelCase', function () {
  var str = 'lorem-ipsum-dolor'
  t.eq(camelCase(str), 'loremIpsumDolor')
})

test('should convert spaces to camelCase', function () {
  var str = '  lorem ipsum  dolor  '
  t.eq(camelCase(str), 'loremIpsumDolor')
})

test('should convert underscores to camelCase', function () {
  var str = 'lorem_ipsum_dolor'
  t.eq(camelCase(str), 'loremIpsumDolor')
})

test('should remove non word', function () {
  var str = ' #$  lorem ipsum ^ &:  dolor ++ '
  t.eq(camelCase(str), 'loremIpsumDolor')
})

test('should replace accents', function () {
  var str = 'spéçïãl chârs'
  t.eq(camelCase(str), 'specialChars')
})

test('should do it all at once', function () {
  var str = '  %$ & lorem Ipsum @ dolor spéçïãl  ! chârs  )( )  '
  t.eq(camelCase(str), 'loremIpsumDolorSpecialChars')
})

test('should treat null as empty string', function () {
  t.is(camelCase(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(camelCase(void 0), '')
})
