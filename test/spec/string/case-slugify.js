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
