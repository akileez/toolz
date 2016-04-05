var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/join')
var t = painless.assert

var join = require('../../../src/string/join')

test('underscore.string join test', function () {
  t.eq(join('', 'foo', 'bar'), 'foobar', 'basic join')
  t.eq(join('', 1, 'foo', 2), '1foo2', 'join numbers and strings')
  t.eq(join(' ', 'foo', 'bar'), 'foo bar', 'join with spaces')
  t.eq(join('1', '2', '2'), '212', 'join number strings')
  t.eq(join(1, 2, 2), '212', 'join numbers')
  t.eq(join('', 'foo', null), 'foo', 'join null with string returns string')
  t.eq(join(null, 'foo', 'bar'), 'foobar', 'join strings with null returns string')
  t.eq(join(1, 2, 3, 4), '21314')
  t.eq(join('|', 'foo', 'bar', 'baz'), 'foo|bar|baz')
  t.eq(join('', 2, 3, null), '23')
  t.eq(join(null, 2, 3), '23')
})

test('make a path', function () {
  t.eq(join('/', 'foo', 'bar', 'baz'), 'foo/bar/baz', 'join to form a path')
})
