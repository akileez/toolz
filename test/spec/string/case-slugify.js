var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-slugify')
var t = painless.assert

var slugify = require('../../../src/string/case-slugify')

test('shouldn\'t split camelCase text', function () {
  var str = 'loremIpsum'
  t.eq(slugify(str), 'loremipsum')
})

test('should replace spaces with delimeter', function () {
  var str = '  lorem ipsum    dolor'
  t.eq(slugify(str, '_'), 'lorem_ipsum_dolor')
})

test('should use hyphen as delimeter by default', function () {
  var str = 'lorem ipsum dolor'
  t.eq(slugify(str), 'lorem-ipsum-dolor')
})

test('should remove non-word chars', function () {
  var str = ' %# lorem ipsum  ? $  dolor'
  t.eq(slugify(str), 'lorem-ipsum-dolor')
})

test('should replace accents', function () {
  var str = 'spéçïãl chârs'
  t.eq(slugify(str), 'special-chars')
})

test('should convert to lowercase', function () {
  var str = 'LOREM IPSUM'
  t.eq(slugify(str), 'lorem-ipsum')
})

test('should do it all at once', function () {
  var str = '  %$ & lorem Ipsum @ dolor spéçïãl  ! chârs  )( )  '
  t.eq(slugify(str), 'lorem-ipsum-dolor-special-chars')
})

test('should treat null as empty string', function () {
  t.is(slugify(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(slugify(void 0), '')
})

test('underscore.string slugify test', function() {
  t.eq(slugify('Jack & Jill like numbers 1,2,3 and 4 and silly characters ?%.$!/'), 'jack-jill-like-numbers-123-and-4-and-silly-characters')
  t.eq(slugify('Un éléphant à l\'orée du bois'), 'un-elephant-a-loree-du-bois')
  // t.eq(slugify('I know latin characters: á í ó ú ç ã õ ñ ü ă ș ț'), 'i-know-latin-characters-a-i-o-u-c-a-o-n-u-a-s-t')
  t.eq(slugify('I am a word too, even though I am but a single letter: i!'), 'i-am-a-word-too-even-though-i-am-but-a-single-letter-i')
  t.eq(slugify('Some asian 天地人 characters'), 'some-asian-characters')
  t.eq(slugify('SOME Capital Letters'), 'some-capital-letters')
  t.eq(slugify(''), '')
  t.eq(slugify(null), '')
  t.eq(slugify(undefined), '')
})

