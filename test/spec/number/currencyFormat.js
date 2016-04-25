var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/currencyFormat')
var t = painless.assert

var currencyFormat = require('../../../src/number/currencyFormat')

test('should format numbers into a currency-like format', function () {
  t.is(currencyFormat(0), '0.00')
  t.is(currencyFormat(1), '1.00')
  t.is(currencyFormat(999), '999.00')
  t.is(currencyFormat(1000), '1,000.00')
  t.is(currencyFormat(1000000), '1,000,000.00')
})

test('should handle negative numbers', function () {
  t.is(currencyFormat(-10), '-10.00')
  t.is(currencyFormat(-1000), '-1,000.00')
  t.is(currencyFormat(-100000), '-100,000.00')
})

test('should allow custom separators', function () {
  t.is(currencyFormat(0, 2, ',', '.'), '0,00')
  t.is(currencyFormat(1, 2, ',', '.'), '1,00')
  t.is(currencyFormat(999, 2, ',', '.'), '999,00')
  t.is(currencyFormat(1000, 2, ',', '.'), '1.000,00')
  t.is(currencyFormat(1000000, 2, ',', '.'), '1.000.000,00')
})

test('should allow custom number of decimal digits', function () {
  t.is(currencyFormat(1, 4), '1.0000')
  t.is(currencyFormat(999, 4), '999.0000')
  t.is(currencyFormat(1000, 4), '1,000.0000')

  t.is(currencyFormat(1, 0), '1')
  t.is(currencyFormat(999, 0), '999')
  t.is(currencyFormat(1000, 0), '1,000')
})

test('should typecast value to number', function () {
  t.is(currencyFormat(null), '0.00')
  t.is(currencyFormat(''), '0.00')
  t.is(currencyFormat('123.45'), '123.45')
})
