var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/ends-with')
var t = painless.assert

var endsWith = require('../../../src/string/ends-with')

test('should return true if string ends with suffix', function () {
  t.ok(endsWith('lorem-ipsum', 'ipsum'))
})

test('should return false if string does not end with suffix', function () {
  t.notOk(endsWith('lorem-ipsum', 'lorem'))
})

test('should treat undefined as empty string', function () {
  t.notOk(endsWith(void 0, 'ipsum'))
  t.ok(endsWith('', void 0))
})

test('should treat null as empty string', function () {
  t.ok(endsWith(null, ''))
  t.ok(endsWith('', null))
})

test('should return true if suffix undefined', function () {
  t.ok(endsWith('lorem-ipsum', void 0))
})

test('should return true if suffix null', function () {
  t.ok(endsWith('lorem-ipsum', null))
})
