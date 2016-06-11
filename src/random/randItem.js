var assert = require('assert')
/*
  random-item <https://github.com/sindresorhus/random-item>
  Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

  Get a random item from an array. This is essentially random/choice. Just a
  different implementation

*/

function randItem (arr) {
  assert(Array.isArray(arr), 'Expected an array as input')
  return arr[Math.floor(Math.random() * arr.length)]
}

module.exports = randItem
