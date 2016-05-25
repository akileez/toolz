var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-camelize')
var t = painless.assert

var camelCase = require('../../../src/string/case-camelize')
// var camelCase = require('../../../src/string/case').camel

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

test('underscore.string camelize tests', function(){
  t.eq(camelCase('the_camelize_string_method'), 'theCamelizeStringMethod')
  t.eq(camelCase('webkit-transform'), 'webkitTransform')
  t.eq(camelCase('-the-camelize-string-method'), 'theCamelizeStringMethod')
  t.eq(camelCase('_the_camelize_string_method'), 'theCamelizeStringMethod')
  t.eq(camelCase('The-camelize-string-method'), 'theCamelizeStringMethod')
  t.eq(camelCase('the camelize string method'), 'theCamelizeStringMethod')
  t.eq(camelCase(' the camelize  string method'), 'theCamelizeStringMethod')
  t.eq(camelCase('the camelize   string method'), 'theCamelizeStringMethod')
  t.eq(camelCase(' with   spaces'), 'withSpaces')
  t.eq(camelCase('_som eWeird---name-'), 'somEWeirdName')
  t.eq(camelCase(''), '', 'Camelize empty string returns empty string')
  t.eq(camelCase(null), '', 'Camelize null returns empty string')
  t.eq(camelCase(undefined), '', 'Camelize undefined returns empty string')
  t.eq(camelCase(123), '123')
})

test ('case tests', function () {
  var expected = 'thisIsAString'
  t.is(camelCase('thisIsAString'), expected)
  t.is(camelCase('This Is A String'), expected)
  t.ne(camelCase('THIS_IS_A_STRING'), expected)
  t.ne(camelCase('this.is.a.string'), expected)
  t.is(camelCase('This is a string.'), expected)
  t.is(camelCase('this-is-a-string'), expected)
  t.is(camelCase('this_is_a_string'), expected)
  t.is(camelCase('this is a string'), expected)
  t.is(camelCase('This Is a String'), expected)
})

