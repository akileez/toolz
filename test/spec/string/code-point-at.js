var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/code-point-at')
var t = painless.assert

var m = require('../../../src/string/code-point-at')

test('should handle a string that starts with a BMP symbol', () => {
  t.is(m('🐴'), 0x1F434)

  // borrowed from:
  // https://github.com/mathiasbynens/String.prototype.codePointAt/blob/075017413b4a99568d0bf290250c8b17ff5441be/tests/tests.js

  t.is(m('abc\uD834\uDF06def', ''), 0x61)
  t.is(m('abc\uD834\uDF06def', '_'), 0x61)
  t.is(m('abc\uD834\uDF06def'), 0x61)
  t.is(m('abc\uD834\uDF06def', -Infinity), undefined)
  t.is(m('abc\uD834\uDF06def', -1), undefined)
  t.is(m('abc\uD834\uDF06def', -0), 0x61)
  t.is(m('abc\uD834\uDF06def', 0), 0x61)
  t.is(m('abc\uD834\uDF06def', 3), 0x1D306)
  t.is(m('abc\uD834\uDF06def', 4), 0xDF06)
  t.is(m('abc\uD834\uDF06def', 5), 0x64)
  t.is(m('abc\uD834\uDF06def', 42), undefined)
  t.is(m('abc\uD834\uDF06def', Infinity), undefined)
  t.is(m('abc\uD834\uDF06def', Infinity), undefined)
  t.is(m('abc\uD834\uDF06def', NaN), 0x61)
  t.is(m('abc\uD834\uDF06def', false), 0x61)
  t.is(m('abc\uD834\uDF06def', null), 0x61)
  t.is(m('abc\uD834\uDF06def', undefined), 0x61)
})

test('should handle a string that starts with an astral symbol', () => {
  t.is(m('\uD834\uDF06def', ''), 0x1D306)
  t.is(m('\uD834\uDF06def', '1'), 0xDF06)
  t.is(m('\uD834\uDF06def', '_'), 0x1D306)
  t.is(m('\uD834\uDF06def'), 0x1D306)
  t.is(m('\uD834\uDF06def', -1), undefined)
  t.is(m('\uD834\uDF06def', -0), 0x1D306)
  t.is(m('\uD834\uDF06def', 0), 0x1D306)
  t.is(m('\uD834\uDF06def', 1), 0xDF06)
  t.is(m('\uD834\uDF06def', 42), undefined)
  t.is(m('\uD834\uDF06def', false), 0x1D306)
  t.is(m('\uD834\uDF06def', null), 0x1D306)
  t.is(m('\uD834\uDF06def', undefined), 0x1D306)
})

test('should handle lone high surrogates', () => {
  t.is(m('\uD834abc', ''), 0xD834)
  t.is(m('\uD834abc', '_'), 0xD834)
  t.is(m('\uD834abc'), 0xD834)
  t.is(m('\uD834abc', -1), undefined)
  t.is(m('\uD834abc', -0), 0xD834)
  t.is(m('\uD834abc', 0), 0xD834)
  t.is(m('\uD834abc', false), 0xD834)
  t.is(m('\uD834abc', NaN), 0xD834)
  t.is(m('\uD834abc', null), 0xD834)
  t.is(m('\uD834abc', undefined), 0xD834)
})

test('should handle lone low surrogates', () => {
  t.is(m('\uDF06abc', ''), 0xDF06)
  t.is(m('\uDF06abc', '_'), 0xDF06)
  t.is(m('\uDF06abc'), 0xDF06)
  t.is(m('\uDF06abc', -1), undefined)
  t.is(m('\uDF06abc', -0), 0xDF06)
  t.is(m('\uDF06abc', 0), 0xDF06)
  t.is(m('\uDF06abc', false), 0xDF06)
  t.is(m('\uDF06abc', NaN), 0xDF06)
  t.is(m('\uDF06abc', null), 0xDF06)
  t.is(m('\uDF06abc', undefined), 0xDF06)
})

test('should throw is string is null or undefined', () => {
  t.throws(() => m(null))
  t.throws(() => m(undefined))
})
