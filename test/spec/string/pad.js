var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/pad')
var t = painless.assert

var pad = require('../../../src/string/pad')

// fix tests as I have changed the function signature.

test('underscore.string pad test', function () {
  t.eq(pad('1', 8), '       1')
  t.eq(pad(1, 8), '       1')
  t.eq(pad('1', 8, '0'), '00000001')
  t.eq(pad('1', 8, '0', 'left'), '00000001')
  t.eq(pad('1', 8, '0', 'right'), '10000000')
  t.eq(pad('1', 8, '0', 'both'), '00001000')
  t.eq(pad('foo', 8, '0', 'both'), '000foo00')
  t.eq(pad('foo', 7, '0', 'both'), '00foo00')
  t.eq(pad('foo', 7, '!@$%dofjrofj', 'both'), '!!foo!!')
})

test('test for null/undefined', function () {
  t.eq(pad('', 2), '  ')
  t.eq(pad(null, 2), '  ')
  t.eq(pad(undefined, 2), '  ')
})

test('#lpad', function() {
  t.eq(pad.left('1', 8), '       1')
  t.eq(pad.left(1, 8), '       1')
  t.eq(pad.left('1', 8, '0'), '00000001')
  t.eq(pad.left('1', 8, '0', 'left'), '00000001')
  t.eq(pad.left('', 2), '  ')
  t.eq(pad.left(null, 2), '  ')
  t.eq(pad.left(undefined, 2), '  ')
})

test('#rpad', function() {
  t.eq(pad.right('1', 8), '1       ')
  t.eq(pad.right(1, 8), '1       ')
  t.eq(pad.right('1', 8, '0'), '10000000')
  t.eq(pad.right('foo', 8, '0'), 'foo00000')
  t.eq(pad.right('foo', 7, '0'), 'foo0000')
  t.eq(pad.right('', 2), '  ')
  t.eq(pad.right(null, 2), '  ')
  t.eq(pad.right(undefined, 2), '  ')
})
