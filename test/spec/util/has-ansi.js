var painless = require('../../assertion/painless')
var test = painless.createGroup('Test util/has-ansi')
var t = painless.assert

var hasAnsi = require('../../../src/util/has-ansi')

test('should return true or false', () => {
	t.true(hasAnsi('foo\u001B[4mcake\u001B[0m'))
	t.false(hasAnsi('cake'))
})