var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-dash')
var t = painless.assert

var dash = require('../../../src/string/case-dash')

test('#dasherize', function(){
  t.is(dash('the_dasherize_string_method'), 'the-dasherize-string-method')
  t.is(dash('TheDasherizeStringMethod'), 'the-dasherize-string-method')
  t.is(dash('thisIsATest'), 'this-is-a-test')
  t.is(dash('this Is A Test'), 'this-is-a-test')
  t.is(dash('thisIsATest123'), 'this-is-a-test123')
  t.is(dash('123thisIsATest'), '123this-is-a-test')
  t.is(dash('the dasherize string method'), 'the-dasherize-string-method')
  t.is(dash('the  dasherize string method  '), 'the-dasherize-string-method')
  t.is(dash('téléphone'), 'téléphone')
  t.is(dash('foo$bar'), 'foo$bar')
  t.is(dash('input with a-dash'), 'input-with-a-dash')
  t.is(dash(''), '')
  t.is(dash(null), 'null')
  t.is(dash(NaN), 'na-n')
  t.is(dash(undefined), 'undefined')
  t.is(dash(123), '123')
})

test('should convert camelcase to dashes:', function () {
  t.is(dash('fooBar'), 'foo-bar')
  t.is(dash('fooBarBaz'), 'foo-bar-baz')
});

test('should strip dashes from oes and sos', function () {
  t.is(dash('-foo'), 'foo')
  t.is(dash('foo-'), 'foo')
  t.is(dash('-foo-'), 'foo')
});

test('should convert spaces to dashes:', function () {
  t.is(dash('foo bar'), 'foo-bar')
  t.is(dash('foo barBaz'), 'foo-bar-baz')
  t.is(dash('foo barBaz quux'), 'foo-bar-baz-quux')
});

test('should convert space followed by uppercase letter to a single dash :', function() {
  t.is(dash('foo Bar'), 'foo-bar')
  t.is(dash('Foo BarBaz quux'), 'foo-bar-baz-quux')
});

test('should work when leading character is uppercase:', function () {
  t.is(dash('Foo barBaz quux'), 'foo-bar-baz-quux')
});
