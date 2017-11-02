'use strict'
const ansiRegex = require('../regex/ansi-regex')
const replace   = require('../regex/replace')

function strip (input) {
	return typeof input === 'string'
		? replace(input, ansiRegex(), '')
		: input
}

module.exports = strip