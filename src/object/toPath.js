// adopted from: to-object-path <https://github.com/jonschlinkert/to-object-path>
// Copyright (c) 2015-2016, Jon Schlinkert. (MIT)

'use strict'

var isArguments = require('../lang/isArguments')
var apply = require('../function/apply')

function toPath (args) {
  if (!isArguments(args)) args = arguments
  return filter(args).join('.')
}

function filter (arr) {
  var len = arr.length
  var i = -1
  var res = []

  while (++i < len) {
    var ele = arr[i]
    if (isArguments(ele) || Array.isArray(ele)) {
      // res.push.apply(res, filter(ele))
      apply(res.push, res, filter(ele))
    } else if (typeof ele === 'string') {
      res.push(ele)
    }
  }

  return res
}

module.exports = toPath
