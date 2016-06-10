// unique-random <https://github.com/sindresorhus/unique-random>
// Copyright (c) Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) (MIT)

var random = require('./random')

/*
  Useful for things like slideshows where you don't want to have the
  same slide twice in a row.

  API:
  uniqueRandom(min, max)
  Returns a function that when called will return a random number that's never the same as the previous.

  Usage:
    var uniqueRandom = require('unique-random');
    var rand = uniqueRandom(1, 10);

    console.log(rand(), rand(), rand());
    //=> 5 2 6
*/

function randUnique (min, max) {
  var prev
  return function rand () {
    var num = Math.floor(random() * (max - min + 1) + min)
    prev = num === prev && min !== max ? rand() : num

    return prev
  }
}

module.exports = randUnique
