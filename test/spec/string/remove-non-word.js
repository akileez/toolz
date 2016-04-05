var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/remove-non-word')
var t = painless.assert

var removeNonWord = require('../../../src/string/remove-non-word')

test('should remove non word chars', function () {
  var str = 'lorem ~!@#$%^&*()_+`-={}[]|\\:";\'/?><., ipsum\xD7'
  t.eq(removeNonWord(str), 'lorem _- ipsum')
})

test('should treat null as empty string', function () {
  t.eq(removeNonWord(null), '')
})

test('should treat undefined as empty string', function () {
  t.eq(removeNonWord(void 0), '')
})
