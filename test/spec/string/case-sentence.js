var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-sentence')
var t = painless.assert

var sentence = require('../../../src/string/case-sentence')

test('should uppercase first char of each sentence and lowercase others', function () {
  var str = 'lorem Ipsum doLOr. sit amet dolor.'
  t.eq(sentence(str),
    'Lorem ipsum dolor. Sit amet dolor.')
})

test('should treat null as empty string', function () {
  t.eq(sentence(null), '')
})

test('should treat undefined as empty string', function () {
  t.eq(sentence(void 0), '')
})
