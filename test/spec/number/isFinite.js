var painless = require('../../assertion/painless')
var test = painless.createGroup('Test number/isFinite')
var t = painless.assert

var isFinite = require('../../../src/number/isFinite')

test('should pass basic tests', () => {
  t.true(isFinite(0))
  t.true(isFinite(100))
  t.true(isFinite(-100))
  t.true(isFinite(4e44))
  t.false(isFinite('0'))
  t.false(isFinite(NaN))
  t.false(isFinite(undefined))
  t.false(isFinite(Infinity))
  t.false(isFinite(-Infinity))
})

var shouldPass = [
  0xff,
  5e3,
  0,
  0.1,
  -0.1,
  -1.1,
  37,
  3.14,

  1,
  1.1,
  10,
  10.10,
  100,
  -100,

  +'0.1',
  +'-0.1',
  +'-1.1',
  +'0',
  +'012',
  +'0xff',
  +'1',
  +'1.1',
  +'10',
  +'10.10',
  +'100',
  +'5e3',

  Math.LN2,
  Number(1),
  // new Number(1),

  // 012, Octal literal not allowed in strict mode
  parseInt('012'),
  parseFloat('012'),
  Math.abs(1),
  Math.acos(1),
  Math.asin(1),
  Math.atan(1),
  Math.atan2(1, 2),
  Math.ceil(1),
  Math.cos(1),
  Math.E,
  Math.exp(1),
  Math.floor(1),
  Math.LN10,
  Math.LN2,
  Math.log(1),
  Math.LOG10E,
  Math.LOG2E,
  Math.max(1, 2),
  Math.min(1, 2),
  Math.PI,
  Math.pow(1, 2),
  Math.pow(5, 5),
  Math.random(1),
  Math.round(1),
  Math.sin(1),
  Math.sqrt(1),
  Math.SQRT1_2,
  Math.SQRT2,
  Math.tan(1),

  Number.MAX_VALUE,
  Number.MIN_VALUE,

  +'0.0',
  +'0x0',
  +'0e+5',
  +'000',
  +'0.0e-5',
  +'0.0E5',

  +'',
  +1,
  +3.14,
  +37,
  +5,
  +[],
  +Boolean(true),
  +false,
  +Math.LN2,
  +String(100),
  +true,
  +null,
  +Number(1),
  +new Array(''),
  +new Array(0),
  +new Boolean(true),
  +new Buffer(''),
  +new Date,
  +new Date(),
  +new Number(1),
]

shouldPass.forEach(function (num) {
  test('should be a number (' + JSON.stringify(num) + ')', function () {
    t.true(isFinite(num))
  })
})