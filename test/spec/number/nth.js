var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/nth')
var t = painless.assert

var nth = require('../../../src/number/nth')

test('should return "st" for numbers ending in "1" besides numbers that ends in "11"', function () {
  t.is(nth(1), 'st')
  t.isnt(nth(11), 'st')
  t.is(nth(21), 'st')
  t.is(nth(31), 'st')
  t.is(nth(51), 'st')
  t.is(nth(101), 'st')
  t.isnt(nth(111), 'st')
  t.is(nth(121), 'st')
  t.is(nth(1001), 'st')
  t.isnt(nth(1011), 'st')
  t.is(nth(1021), 'st')
})

test('should return "th" for numbers ending in "11"', function () {
  t.eq(nth(11), 'th')
  t.eq(nth(111), 'th')
  t.eq(nth(211), 'th')
  t.eq(nth(1011), 'th')
})

test('should return "nd" for numbers ending in "2" besides numbers that ends in "12"', function () {
  t.eq(nth(2), 'nd')
  t.ne(nth(12), 'nd')
  t.eq(nth(22), 'nd')
  t.ne(nth(212), 'nd')
  t.eq(nth(232), 'nd')
  t.ne(nth(1012), 'nd')
  t.eq(nth(1052), 'nd')
})

test('should return "th" for numbers ending in "12"', function () {
  t.eq(nth(12), 'th')
  t.eq(nth(112), 'th')
  t.eq(nth(212), 'th')
  t.eq(nth(1012), 'th')
})

test('should return "rd" for numbers ending in "3" besides numbers that ends in "13"', function () {
  t.eq(nth(3), 'rd')
  t.ne(nth(13), 'rd')
  t.eq(nth(23), 'rd')
  t.eq(nth(233), 'rd')
  t.ne(nth(1013), 'rd')
  t.eq(nth(1053), 'rd')
})

test('should return "th" for numbers ending in "13"', function () {
  t.eq(nth(13), 'th')
  t.eq(nth(113), 'th')
  t.eq(nth(213), 'th')
  t.eq(nth(1013), 'th')
})

test('should return "th" for numbers ending in "4, 5, 6, 7, 8, 9, 0', function () {
  t.eq(nth(0), 'th')
  t.eq(nth(4), 'th')
  t.eq(nth(5), 'th')
  t.eq(nth(6), 'th')
  t.eq(nth(7), 'th')
  t.eq(nth(8), 'th')
  t.eq(nth(9), 'th')
  t.eq(nth(104), 'th')
  t.eq(nth(115), 'th')
  t.eq(nth(216), 'th')
  t.eq(nth(1017), 'th')
  t.eq(nth(2018), 'th')
  t.eq(nth(123019), 'th')
  t.eq(nth(9281230), 'th')
})
