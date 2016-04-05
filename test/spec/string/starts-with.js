var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/starts-with')
var t = painless.assert

var startsWith = require('../../../src/string/starts-with')

test('should return true if string starts with prefix', function () {
  t.ok(startsWith('lorem-ipsum', 'lorem'))
})

test('should return false if string does not start with prefix', function () {
  t.notOk(startsWith('lorem-ipsum', 'ipsum'))
})

test('should return true if prefix is empty', function () {
  t.ok(startsWith('', ''))
  t.ok(startsWith('lorem', ''))
})

test('should treat undefined as empty string', function () {
  t.notOk(startsWith(void 0, 'ipsum'))
  t.ok(startsWith('lorem', void 0))
})

test('should treat null as empty string', function () {
  t.ok(startsWith(null, ''))
  t.ok(startsWith('lorem', null))
})
