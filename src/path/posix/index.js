// adopted from: path2 <https://github.com/medikoo/path2>
// Copyright Joyent, Inc. and other Node contributors. All rights reserved. (MIT)

'use strict'

// Modular and extended version of Node's path package

module.exports = {
  basename   : require('./basename'),
  delimiter  : require('./delimiter'),
  dirname    : require('./dirname'),
  extname    : require('./extname'),
  isAbsolute : require('./is-absolute'),
  join       : require('./join'),
  normalize  : require('./normalize'),
  relative   : require('./relative'),
  resolve    : require('./resolve'),
  sep        : require('./sep'),
  common     : require('./common')
}
