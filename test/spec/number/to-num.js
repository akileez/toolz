var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/toNum')
var t = painless.assert

var toNumber = require('../../../src/number/toNum')
var each = require('../../../src/array/forEach')


test('#toNumber', function () {
  each(['not a number', NaN, {}, [/a/], 'alpha6'], function(val) {
    t.ok(isNaN(toNumber('not a number')));
    t.eq(toNumber(Math.PI, val), 3);
  });
  t.eq(toNumber(0), 0);
  t.eq(toNumber('0'), 0);
  t.eq(toNumber('0.0'), 0);
  t.eq(toNumber('        0.0    '), 0);
  t.eq(toNumber('0.1'), 0);
  t.eq(toNumber('0.1', 1), 0.1);
  t.eq(toNumber('  0.1 ', 1), 0.1);
  t.eq(toNumber('0000'), 0);
  t.eq(toNumber('2.345'), 2);
  t.eq(toNumber('2.345', NaN), 2);
  t.eq(toNumber('2.345', 2), 2.35);
  t.eq(toNumber('2.344', 2), 2.34);
  t.eq(toNumber('2', 2), 2.00);
  t.eq(toNumber(2, 2), 2.00);
  t.eq(toNumber(-2), -2);
  t.eq(toNumber('-2'), -2);
  t.eq(toNumber(-2.5123, 3), -2.512);

  // Negative precisions
  t.eq(toNumber(-234, -1), -230);
  t.eq(toNumber(234, -2), 200);
  t.eq(toNumber('234', -2), 200);

  each(['', null, undefined], function(val) {
    t.eq(toNumber(val), 0);
  });

  each([Infinity, -Infinity], function(val) {
    t.eq(toNumber(val), val);
    t.eq(toNumber(val, val), val);
    t.eq(toNumber(1, val), 1);
  });
});