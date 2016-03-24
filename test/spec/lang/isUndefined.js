var painless = require('../../assertion/painless')
var test = painless.createGroup('Test lang/isUndefined')
var t = painless.assert

var isUndefined = require('../../src/lang/isUndefined')

test('should detect if value is undefined', function () {
    t.is(isUndefined(undefined), true)
    t.is(isUndefined(), true)

    t.is(isUndefined(''), false)
    t.is(isUndefined(123), false)
    t.is(isUndefined(null), false)
    t.is(isUndefined({}), false)
    t.is(isUndefined([]), false)
})