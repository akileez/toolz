// adopted from <https://github.com/sindresorhus/escape-string-regexp>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (MIT) 

'use strict'

const assert = require('assert')
const replace = require('./replace')
const matchOpsRe = require('./rex-escRegexpStrChars')

function escRegExpChars (str) {
	assert(typeof str === 'string', 'Expected a string')
	return replace(str, matchOpsRe, '\\$&')
}

module.exports = escRegExpChars