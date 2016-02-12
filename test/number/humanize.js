var test = require('../../src/assertion/ttr')
var humanize = require('../../src/number/humanize')

test('humanize(n, options) should delimit thousandths', function (t) {
  t.is(humanize(1000), '1,000')
  t.is(humanize(1000000), '1,000,000')
  t.is(humanize(10500), '10,500')
})

test('humanize(n, options) should retain fractions', function (t) {
  t.is(humanize(15.99), '15.99')
  t.is(humanize(1500.99), '1,500.99')
})

test('"delimiter" option should change the delimiter', function (t) {
  t.is(humanize(1500, { delimiter: '.' }), '1.500')
})

test('"separator" option should change the separator', function (t) {
  t.is(humanize(15.99, { separator: ',' }), '15,99')
})

test.result()
