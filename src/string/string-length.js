'use strict'

const stripAnsi = require('../util/strip-ansi')
const astralRegex = require('../regex/astral-regex')
const replace     = require('../regex/replace')

function stringLength (input) {
	return replace(stripAnsi(input), astralRegex(), ' ').length
}

module.exports = stringLength
