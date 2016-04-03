var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-hyphenate')
var t = painless.assert

var hyphenate = require('../../../src/string/case-hyphenate')

test('should split camelCase text', function () {
  var str = 'loremIpsum'
  t.eq(hyphenate(str), 'lorem-ipsum')
})

test('should replace spaces with hyphens', function () {
  var str = '  lorem ipsum    dolor'
  t.eq(hyphenate(str), 'lorem-ipsum-dolor')
})

test('should remove non-word chars', function () {
  var str = ' %# lorem ipsum  ? $  dolor'
  t.eq(hyphenate(str), 'lorem-ipsum-dolor')
})

test('should replace accents', function () {
  var str = 'spéçïãl chârs'
  t.eq(hyphenate(str), 'special-chars')
})

test('should convert to lowercase', function () {
  var str = 'LOREM IPSUM'
  t.eq(hyphenate(str), 'lorem-ipsum')
})

test('should do it all at once', function () {
  var str = '  %$ & loremIpsum @ dolor spéçïãl  ! chârs  )( )  '
  t.eq(hyphenate(str), 'lorem-ipsum-dolor-special-chars')
})

test('should do it all at once again', function () {
  var str = '%$ & loremIpsum @ dolor spéçïãl  ! chârs  )( )  '
  t.eq(hyphenate(str), 'lorem-ipsum-dolor-special-chars')
})

test('should treat null as empty string', function () {
  t.is(hyphenate(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(hyphenate(void 0), '')
})
