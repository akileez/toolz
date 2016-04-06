var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-unhyphenate')
var t = painless.assert

var unhyphenate = require('../../../src/string/case-unhyphenate')

test('should replace hyphens with spaces if between words', function () {
  var s1 = 'lorem-ipsum-dolor-sit-amet'
  var s2 = 'lorem-ipsum-dolor--sit-amet'
  var s3 = 'lorem-ipsum-dolor---sit-amet'
  var s4 = 'lorem-ipsum-dolor - sit-amet'

  t.eq(unhyphenate(s1), 'lorem ipsum dolor sit amet')
  t.eq(unhyphenate(s2), 'lorem ipsum dolor--sit amet')
  t.eq(unhyphenate(s3), 'lorem ipsum dolor---sit amet')
  t.eq(unhyphenate(s4), 'lorem ipsum dolor - sit amet')
})

test('should treat null as empty string', function () {
  t.is(unhyphenate(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(unhyphenate(void 0), '')
})
