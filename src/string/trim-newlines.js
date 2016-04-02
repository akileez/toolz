// adopted from trim-newlines <>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

function trimNL (str) {
  return end(start(str))
}

function start (str) {
  return replace(str, /^[\r\n]+/, '')
}

function end (str) {
  return replace(str, /[\r\n]+$/, '')
}

exports.trim = trimNL
exports.start = start
exports.end = end