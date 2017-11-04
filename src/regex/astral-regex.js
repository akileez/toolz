// adopted from: https://github.com/kevva/astral-regex
// Copyright (c) Kevin Mårtensson 
// <kevinmartensson@gmail.com> (github.com/kevva)

'use strict'

const regex = '[\uD800-\uDBFF][\uDC00-\uDFFF]'
// const regex = '\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]?|[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe23\u20d0-\u20f0]|\ud83c[\udffb-\udfff])?)*'

function astral (opts) {
	return opts && opts.exact 
		? new RegExp(`^${regex}$`)
		: new RegExp(regex, 'g')
}

module.exports = astral
