var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isFunction')
var t = painless.assert

var isFunction = require('../../src/lang/isFunction')

test('should detect if value is a function', function () {
    t.is(isFunction(function () {}), true)
    t.is(isFunction(new Function('return 1;')), true)

    t.is(isFunction(''), false)
    t.is(isFunction(123), false)
    t.is(isFunction(null), false)
    t.is(isFunction({}), false)
    t.is(isFunction([]), false)
})