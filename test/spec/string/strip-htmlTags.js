var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/strip-htmlTags')
var t = painless.assert

var stripHtmlTags = require('../../../src/string/strip-htmlTags')

test('should remove html tags', function () {
  var str = '<div><div><span>lorem</span> ipsum <b>dolor</b></div><div> sit </div></div>amet'
  t.eq(stripHtmlTags(str), 'lorem ipsum dolor sit amet')
})

test('should treat null as empty string', function () {
  t.is(stripHtmlTags(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(stripHtmlTags(void 0), '')
})
