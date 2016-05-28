var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/ordinal')
var t = painless.assert

var ordinal = require('../../../src/number/ordinal')

test('should return "[N]st" if number ends with "1" and [N]th if number ends with "11"', function () {
  t.is(ordinal(1), '1st')
  t.is(ordinal(11), '11th')
  t.is(ordinal(111), '111th')
  t.is(ordinal(12341), '12341st')
})

test('should return "[N]nd" dor numbers ending with "2" and [N]th for numbers that ends with "12"', function () {
  t.is(ordinal(2), '2nd')
  t.is(ordinal(12), '12th')
  t.is(ordinal(22), '22nd')
  t.is(ordinal(2012), '2012th')
  t.is(ordinal(12342), '12342nd')
})

test('should return "[N]rd" if number ends with "3" and [N]th if number ends with "13"', function () {
  t.is(ordinal(3), '3rd')
  t.is(ordinal(13), '13th')
  t.is(ordinal(23), '23rd')
  t.is(ordinal(1013), '1013th')
  t.is(ordinal(12343), '12343rd')
})

test('should return "[N]th" for numbers ended with 4,5,6,7,8,9,0', function () {
  t.is(ordinal(4), '4th')
  t.is(ordinal(5), '5th')
  t.is(ordinal(6), '6th')
  t.is(ordinal(7), '7th')
  t.is(ordinal(8), '8th')
  t.is(ordinal(9), '9th')
  t.is(ordinal(10), '10th')
  t.is(ordinal(100), '100th')
  t.is(ordinal(456), '456th')
  t.is(ordinal(1459), '1459th')
})
