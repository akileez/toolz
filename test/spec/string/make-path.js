var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/make-path')
var t = painless.assert

var makePath = require('../../../src/string/make-path')

test('should convert to path', function () {
  t.eq(makePath('lorem', 'ipsum', 'dolor'), 'lorem/ipsum/dolor')
})

test('should ignore empty/null values', function () {
  t.eq(makePath('lorem', null, 'ipsum', '', null, 'dolor'), 'lorem/ipsum/dolor')
})

test('should ignore empty/null values at begin', function () {
  t.eq(makePath('', 'foo'), 'foo')
  t.eq(makePath(null, 'bar'), 'bar')
  t.eq(makePath('', null, 'dolor', 'amet'), 'dolor/amet')
})

test('should keep trailing slash if it exists', function () {
  t.eq(makePath('dolor', 'amet/'), 'dolor/amet/')
  t.eq(makePath('dolor', 'ipsum', '/'), 'dolor/ipsum/')
})

test('should keep leading slash if it exists', function () {
  t.eq(makePath('/dolor', 'amet/'), '/dolor/amet/')
  t.eq(makePath('/', 'dolor', 'ipsum', '/'), '/dolor/ipsum/')
})

test('should remove duplicate slashes', function () {
  t.eq(makePath('dolor/', '/', '/ipsum', '//'), 'dolor/ipsum/')
  t.eq(makePath('///dolor//////ipsum', '//'), '/dolor/ipsum/')
})

test('should not remove duplicate slashes if after ":" (protocol)', function () {
  t.eq(makePath('file:///dolor/', '/', '/ipsum', '//'), 'file:///dolor/ipsum/')
  t.eq(makePath('http://dolor/', '/', '/ipsum', '//'), 'http://dolor/ipsum/')
})
