'use strict'

const isFunction = require('../lang/isFunction')
const slice      = require('../array/slice')
const filter     = require('../array/filter')
const concat     = require('../array/concat')

function extract () {
  let args = slice(arguments)
  let result = []
  let i = -1

  while (++i < args.length) {
    const arg = args[i]
    if (isFunction(arg)) result.push(arg)
    else if (Array.isArray(arg)) result = concat(result, filter(arg, isFunction))
  }

  return result.length === 0
    ? undefined
    : result
}

module.exports = extract
