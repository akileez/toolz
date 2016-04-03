var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-pascal')
var t = painless.assert

var pascal = require('../../../src/string/case-pascal')

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
  title: 'This Is a String',
  junk: '-this__is$%a-string...'
}

for (var key in strings) testr(key)

function testr(key) {
  test('should convert ' + key + ' case', function () {
    t.eq(pascal(strings[key]), strings.pascal)
  })
}
