// adopted from: match-condition <https://github.com/kevva/match-condition>
// Copyright (c) Kevin Martensson <kevinmartensson@gmail.com> (github.com/kevva) (MIT)

'use strict'

var isGlob = require('./is-glob')
var isRegex = require('./is-regex')
var micromatch = require('./micromatch')

function matchCondition (val, condition) {
  if (typeof condition === 'boolean') return condition
  if (typeof condition === 'function') return condition(val) ? true : false
  if (isRegex(condition)) return condition.test(val)
  if (isGlob(condition)) return micromatch.isMatch(val, condition)

  return val === condition
}

module.exports = matchCondition
