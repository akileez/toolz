'use strict';
const ansiRegex = require('../regex/ansi-regex')
const contains  = require('../regex/contains')

// Remove the `g` flag
const re = new RegExp(ansiRegex().source)

function hasAnsi (input) {
	return contains(re, input)
}

module.exports = hasAnsi
