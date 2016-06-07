var painless = require('../../assertion/painless')
var test = painless.createGroup('Test text/align')
var testr = painless.createGroup('Test text/align.right')
var testc = painless.createGroup('Test text/align.centered')
var testb = painless.createGroup('Test text/align.list')
var t = painless.assert

var align = require('../../../src/text/align')

var fixture = [
  'Lorem ipsum dolor sit amet,',
  'consectetur adipiscing',
  'elit, sed do eiusmod tempor incididunt',
  'ut labore et dolore',
  'magna aliqua. Ut enim ad minim',
  'veniam, quis'
]

var expected = [
  '     Lorem ipsum dolor sit amet,',
  '        consectetur adipiscing',
  'elit, sed do eiusmod tempor incididunt',
  '         ut labore et dolore',
  '    magna aliqua. Ut enim ad minim',
  '             veniam, quis'
]

var integer = [
  '     Lorem ipsum dolor sit amet,',
  '     consectetur adipiscing',
  '     elit, sed do eiusmod tempor incididunt',
  '     ut labore et dolore',
  '     magna aliqua. Ut enim ad minim',
  '     veniam, quis'
]

var prefixed = [
  '- Lorem ipsum dolor sit amet,',
  '- consectetur adipiscing',
  '- elit, sed do eiusmod tempor incididunt',
  '- ut labore et dolore',
  '- magna aliqua. Ut enim ad minim',
  '- veniam, quis'
]

var character = [
  '~~~~~Lorem ipsum dolor sit amet,',
  '~~~~~~~~consectetur adipiscing',
  'elit, sed do eiusmod tempor incididunt',
  '~~~~~~~~~ut labore et dolore',
  '~~~~magna aliqua. Ut enim ad minim',
  '~~~~~~~~~~~~~veniam, quis'
]

test('should indent lines by the number passed:', function () {
  t.same(align(fixture, 5), integer)
})

test('should auto-indent values in an array:', function () {
  t.same(align([7, 8, 9, 10]), [' 7', ' 8', ' 9', '10'])
  t.same(align(['a', '    b']), ['    a', '    b'])
})

test('should indent lines in an array:', function () {
  t.same(align(fixture, function (len, max, line, lines) {
    return Math.floor((max - len) / 2)
  }), expected)
})

test('should indent lines in a string:', function () {
  t.same(align(fixture.join('\n'), function (len, max, line, lines) {
    return Math.floor((max - len) / 2)
  }), expected.join('\n'))
})

test('should use the `indent` property:', function () {
  t.same(align(fixture, function (len, max, line, lines) {
    return {indent: Math.floor((max - len) / 2)}
  }), expected)
})

test('should use the `prefix` property:', function () {
  t.same(align(fixture, function (len, max, line, lines) {
    return {prefix: '- '}
  }), prefixed)
})

test('should use the `character` property:', function () {
  t.same(align(fixture, function (len, max, line, lines) {
    return {indent: Math.floor((max - len) / 2), character: '~'}
  }), character)
})

test('should throw an error on invalid args:', function () {
  t.throws(function () {
    align()
  })
})

testr('align.right should right align the strings in an array of strings', function () {
  var fix = [
    'Lorem ipsum dolor sit amet,',
    'consectetur adipiscing',
    'elit, sed do eiusmod tempor incididunt',
    'ut labore et dolore',
    'magna aliqua. Ut enim ad minim',
    'veniam, quis'
  ]

  var expected = [
    '           Lorem ipsum dolor sit amet,',
    '                consectetur adipiscing',
    'elit, sed do eiusmod tempor incididunt',
    '                   ut labore et dolore',
    '        magna aliqua. Ut enim ad minim',
    '                          veniam, quis'
  ]

  t.same(align.right(fix), expected)
  t.is(align.right(fix).join('\n'), expected.join('\n'))
})

testc('align.center should center align the strings in an array of strings', function () {
  var fixture = [
    'Lorem ipsum dolor sit amet,',
    'consectetur adipiscing',
    'elit, sed do eiusmod tempor incididunt',
    'ut labore et dolore',
    'magna aliqua. Ut enim ad minim',
    'veniam, quis'
  ]

  var expected = [
    '     Lorem ipsum dolor sit amet,',
    '        consectetur adipiscing',
    'elit, sed do eiusmod tempor incididunt',
    '         ut labore et dolore',
    '    magna aliqua. Ut enim ad minim',
    '             veniam, quis'
  ]

  t.same(align.center(fixture), expected)
  t.is(align.center(fixture).join('\n'), expected.join('\n'))
})

testb('align.list ', function () {
var prefixed = [
  ' - Lorem ipsum dolor sit amet,',
  ' - consectetur adipiscing',
  ' - elit, sed do eiusmod tempor incididunt',
  ' - ut labore et dolore',
  ' - magna aliqua. Ut enim ad minim',
  ' - veniam, quis'
]
  t.same(align.list(fixture), prefixed)
})