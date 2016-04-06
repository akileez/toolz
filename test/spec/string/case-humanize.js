var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-humanize')
var t = painless.assert

var sentence = require('../../../src/string/case-humanize')

test('should do a basic test', () => {
  t.pass()
})

var strings = {
  camel: 'thisIsAString',
  capital: 'This Is A String',
  constant: 'THIS_IS_A_STRING',
  dot: 'this.is.a.string',
  pascal: 'ThisIsAString',
  sentence: 'This is a string',
  slug: 'this-is-a-string',
  snake: 'this_is_a_string',
  space: 'this is a string',
  title: 'This Is a String',
  junk: '-this__is$%a-string...'
}

for (var key in strings) testr(key)

function testr(key) {
  test('should convert ' + key + ' case', function () {
    t.eq(sentence(strings[key]), strings.sentence)
  })
}

test('shouldnt touch sentence case', function () {
  t.eq(sentence('A sentence case string.'), 'A sentence case string.')
})

test('should preserve punctuation', function () {
  t.eq(sentence('A Title: Case of Something.'), 'A title: case of something.')
})
