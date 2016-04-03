var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-uncamelize')
var t = painless.assert

var unCamelCase = require('../../../src/string/case-uncamelize')

test('should add space between camelCase text', function () {
  t.eq(unCamelCase('loremIpsumDolor'), 'lorem ipsum dolor');
  t.eq(unCamelCase('lorem IpsumDolor'), 'lorem ipsum dolor');
});

test('should use specified separator', function () {
  var str = 'loremIpsumDolor';
  t.eq(unCamelCase(str, '-'), 'lorem-ipsum-dolor');
});

test('should treat null as empty string', function () {
  t.is(unCamelCase(null), '');
});

test('should treat undefined as empty string', function () {
  t.is(unCamelCase(void 0), '');
});
