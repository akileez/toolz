// adopted from trim-newlines <>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var replace = require('../regex/replace')

function trimNL (str) {
  return end(start(str))
}

function start (str) {
  return replace(str, /^[\r\n]+/, '')
}

function end (str) {
  return replace(str, /[\r\n]+$/, '')
}

module.exports = trimNL
module.exports.start = start
module.exports.end = end