var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/lines')
var t = painless.assert

var lines = require('../../../src/string/lines')

test('#lines', function () {
  t.eq(lines('Hello World').length, 1)
  t.eq(lines('Hello\nWorld').length, 2)
  t.eq(lines('Hello\n\nWorld').length, 3)
  t.eq(lines('Hello\n\n\nWorld').length, 4)
  t.eq(lines('\n\n\n\n').length, 5)
  t.eq(lines(123).length, 1)
  t.same(lines(''), [''])
  t.same(lines(null), [])
  t.same(lines(undefined), [])
  t.same(lines('Hello\nWorld'), ['Hello', 'World'])
  t.same(lines('Hello\n\nWorld'), ['Hello', '', 'World'])
})
