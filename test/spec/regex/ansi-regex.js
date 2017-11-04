var painless = require('../../assertion/painless')
var test = painless.createGroup('Test regex/ansi-regex')
var t = painless.assert

var are = require('../../../src/regex/ansi-regex')

test('match ansi code in a string', () => {
	t.matches('foo\u001B[4mcake\u001B[0m', are())
	t.matches('\u001B[4mcake\u001B[0m', are())
	t.matches('foo\u001B[4mcake\u001B[0m', are())
	t.matches('\u001B[0m\u001B[4m\u001B[42m\u001B[31mfoo\u001B[39m\u001B[49m\u001B[24mfoo\u001B[0m', are())
	t.matches('foo\u001B[mfoo', are())
})

test('match ansi code from ls command', () => {
	t.regex('\u001B[00;38;5;244m\u001B[m\u001B[00;38;5;33mfoo\u001B[0m', are())
})

test('match reset;setfg;setbg;italics;strike;underline sequence in a string', () => {
	t.regex('\u001B[0;33;49;3;9;4mbar\u001B[0m', are())
	t.is('foo\u001B[0;33;49;3;9;4mbar'.match(are())[0], '\u001B[0;33;49;3;9;4m')
})

test('match clear tabs sequence in a string', () => {
	t.regex('foo\u001B[0gbar', are())
	t.is('foo\u001B[0gbar'.match(are())[0], '\u001B[0g')
})

test('match clear line from cursor right in a string', () => {
	t.regex('foo\u001B[Kbar', are())
	t.is('foo\u001B[Kbar'.match(are())[0], '\u001B[K')
})

test('match clear screen in a string', () => {
	t.regex('foo\u001B[2Jbar', are())
	t.is('foo\u001B[2Jbar'.match(are())[0], '\u001B[2J')
})