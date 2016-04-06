var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-underscore')
var t = painless.assert

var underscore = require('../../../src/string/case-underscore')

test('should split camelCase text', function () {
  var str = 'loremIpsum'
  t.eq(underscore(str), 'lorem_ipsum')
})

test('should replace spaces with underscores', function () {
  var str = '  lorem ipsum   dolor'
  t.eq(underscore(str), 'lorem_ipsum_dolor')
})

test('should remove non-word chars', function () {
  var str = ' %# lorem ipsum  ? $  dolor'
  t.eq(underscore(str), 'lorem_ipsum_dolor')
})

test('should replace accents', function () {
  var str = 'spéçïãl chârs'
  t.eq(underscore(str), 'special_chars')
})

test('should convert to lowercase', function () {
  var str = 'LOREM IPSUM'
  t.eq(underscore(str), 'lorem_ipsum')
})

test('should do it all at once', function () {
  var str = '  %$ & loremIpsum @ dolor spéçïãl  ! chârs  )( )  '
  t.eq(underscore(str), 'lorem_ipsum_dolor_special_chars')
})

test('should treat null as empty string', function () {
  t.is(underscore(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(underscore(void 0), '')
})
