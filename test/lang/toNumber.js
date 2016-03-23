var painless = require('../../src/assertion/painless')
var test = painless.createGroup('Test lang/toNumber')
var t = painless.assert

var toNumber = require('../../src/lang/toNumber')

test('should convert null to zero', function(){
    t.is(toNumber(null), 0)
});

test('should convert undefined to zero', function(){
    // this goes against the [ToNumber](http://es5.github.io/#x9.3)
    // but it will avoid potential headaches for end users
    t.is(toNumber(void(0)), 0)
});

test('should handle empty string as zero', function () {
    t.is(toNumber(''), 0)
});

test('should return numeric value unchanged', function(){
    t.is(toNumber(0), 0)
    t.is(toNumber(123), 123)
    t.is(toNumber(-123), -123)
    t.is(toNumber(0.45), 0.45)
    t.is(toNumber(-0.45), -0.45)
    t.is(toNumber(Infinity), Infinity)
});

test('should keep negative zero sign', function () {
    t.is(1 / toNumber(-0), -Infinity)
    t.is(1 / toNumber(+0), Infinity)
});

test('should typecast boolean into number', function () {
    t.is(toNumber(false),  0)
    t.is(toNumber(true),  1)
});

test('should typecast numeric string into number', function () {
    t.is(toNumber('123'),  123)
    t.is(toNumber('123.45'),  123.45)
});

test('should convert Date to ms integer', function () {
    // use timestamp to make test deterministic (avoid timezone issues)
    t.is(toNumber(new Date(490935600000)),  490935600000)
});

test('should handle String constructor', function () {
    t.is(toNumber(new String('78')),  78)
});

test('should handle Number constructor', function () {
    t.is(toNumber(new Number(90)),  90)
});

test('should return NaN if not numeric', function () {
    t.pass(toNumber('false'),  NaN)
    t.pass(toNumber('true'),  NaN)
    t.pass(toNumber({}),  NaN)
    t.pass(toNumber(/123/),  NaN)
    t.pass(toNumber([]),  NaN)
    t.pass(toNumber([1]),  NaN)
});