var painless = require('../../assertion/painless')
var test = painless.createGroup('Test regex/astral-regex')
var t = painless.assert

var fn = require('../../../src/regex/astral-regex')

const matches = [
	'💩',
	'🦄',
	'🎠',
	'🌈',
	'🐴',
	'😹'
]

const nonMatches = [
	'a',
	'안',
	'1',
	'Z͑ͫ̓ͪ̂ͫ̽͏̴̙̤̞͉͚̯̞̠͍A̴̵̜̰͔ͫ͗͢L̠ͨͧͩ͘G̴̻͈͍͔̹̑͗̎̅͛́Ǫ̵̹̻̝̳͂̌̌͘!͖̬̰̙̗̿̋ͥͥ̂ͣ̐́́͜͞',
	'…',
	'π',
	'®'
]

test('matches', () => {
	for (const x of matches) {
		t.true(fn({exact: true}).test(x))
	}

	for (const x of matches) {
		t.is((fn().exec(`foo ${x} bar`) || [])[0], x)
	}
})

test('non matches', () => {
	for (const x of nonMatches) {
		t.false(fn({exact: true}).test(x))
	}
})