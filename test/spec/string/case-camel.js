var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-camel')
var t = painless.assert

var camel = require('../../../src/string/case-camel')

test('should do a basic test', () => {
  t.pass()
})

var strings = {
  camel: 'thisIsAString',
  capital: 'This Is A String',
  constant: 'THIS_IS_A_STRING',
  dot: 'this.is.a.string',
  pascal: 'ThisIsAString',
  sentence: 'This is a string.',
  slug: 'this-is-a-string',
  snake: 'this_is_a_string',
  space: 'this is a string',
  title: 'This Is a String'
}

for (var key in strings) testr(key)

function testr(key) {
  test('should convert ' + key + ' case', function () {
    t.eq(camel(strings[key]), strings.camel)
  })
}

test('underscore.string camelize tests', function(){
  t.eq(camel('the_camelize_string_method'), 'theCamelizeStringMethod')
  t.eq(camel('webkit-transform'), 'webkitTransform')
  t.eq(camel('The-camelize-string-method'), 'theCamelizeStringMethod')
  t.eq(camel('the camelize string method'), 'theCamelizeStringMethod')
  t.eq(camel('the camelize   string method'), 'theCamelizeStringMethod')
  t.eq(camel(''), '', 'Camelize empty string returns empty string')
})

test('bugs', function () {
  t.ne(camel(' with   spaces'), 'withSpaces')
  t.ne(camel('_som eWeird---name-'), 'somEWeirdName')
  t.ne(camel(' the camelize  string method'), 'theCamelizeStringMethod')
  t.ne(camel('-the-camelize-string-method'), 'theCamelizeStringMethod')
  t.ne(camel('_the_camelize_string_method'), 'theCamelizeStringMethod')
  t.ne(camel('-this__is$%a-string...'), 'thisIsAString')
  t.ne(camel(123), '123')
  t.ne(camel(null), '', 'Camelize null returns empty string')
  t.ne(camel(undefined), '', 'Camelize undefined returns empty string')
})