const painless = require('../../assertion/painless')
const test = painless.createGroup('Test string/string-length')
const t = painless.assert

const fn = require('../../../src/string/string-length')

test('get the real length of a string', () => {
	t.is(fn('𠀔'), 1)
})

test('get the real length of a string', () => {
	t.is(fn('foo𠁐bar𠀃'), 8)
})

test('get the real length of a string', () => {
	t.is(fn('あ'), 1)
})

test('get the real length of a string', () => {
	t.is(fn('谢'), 1)
})

test('get the real length of a string', () => {
	t.is(fn('🐴'), 1)
})

test('get the real length of a string', () => {
	t.is(fn('𝌆'), 1)
})

test('get the real length of a string', () => {
	t.is(fn('\u001B[1mfoo\u001B[22m'), 3)
})