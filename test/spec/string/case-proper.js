var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-proper')
var t = painless.assert

var properCase = require('../../../src/string/case-proper')

test('should uppercase first char of each word and lowercase others', function () {
  t.is(properCase('lorem iPSum dolor'), 'Lorem Ipsum Dolor')
})

test('should treat null as empty string', function () {
  t.is(properCase(null), '')
})

test('should treat undefined as empty string', function () {
  t.is(properCase(void 0), '')
})
