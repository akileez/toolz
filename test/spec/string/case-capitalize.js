var painless = require('../../assertion/painless')
var test = painless.createGroup('Test string/case-capitalize')
var t = painless.assert

var capitalize = require('../../../src/string/case-capitalize')

test('should capitalize first letter', function() {
  t.eq(capitalize('fabio'), 'Fabio', 'First letter is upper case')
  t.eq(capitalize('fabio'), 'Fabio', 'First letter is upper case')
  t.eq(capitalize('FOO'), 'FOO', 'Other letters unchanged')
})

test('should leave all other letters unchanged', function () {
  t.eq(capitalize('FOO', false), 'FOO', 'Other letters unchanged')
  t.eq(capitalize('foO', false), 'FoO', 'Other letters unchanged')
})

test('should lower case all other letters', function () {
  t.eq(capitalize('FOO', true), 'Foo', 'Other letters are lowercased')
  t.eq(capitalize('foO', true), 'Foo', 'Other letters are lowercased')
})

test('should capitalize 1 letter', () => {
  t.eq(capitalize('f', false), 'F', 'Should uppercase 1 letter')
  t.eq(capitalize('f', true), 'F', 'Should uppercase 1 letter')
  t.eq(capitalize('f'), 'F', 'Should uppercase 1 letter')
})

test('should return strings from non-string input', () => {
  t.eq(capitalize(123), '123', 'Non string')
  t.eq(capitalize(123, true), '123', 'Non string')
  t.eq(capitalize(123, false), '123', 'Non string')
})

test('should handle null and undefined', () => {
  t.eq(capitalize(''), '', 'Capitalizing empty string returns empty string')
  t.eq(capitalize(null), '', 'Capitalizing null returns empty string')
  t.eq(capitalize(undefined), '', 'Capitalizing undefined returns empty string')
  t.eq(capitalize('', true), '', 'Capitalizing empty string returns empty string')
  t.eq(capitalize(null, true), '', 'Capitalizing null returns empty string')
  t.eq(capitalize(undefined, true), '', 'Capitalizing undefined returns empty string')
  t.eq(capitalize('', false), '', 'Capitalizing empty string returns empty string')
  t.eq(capitalize(null, false), '', 'Capitalizing null returns empty string')
  t.eq(capitalize(undefined, false), '', 'Capitalizing undefined returns empty string')
})
