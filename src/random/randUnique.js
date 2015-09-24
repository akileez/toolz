var random = require('./random')
// from Sindre Sorhus <sindresorhus@gmail.com> (sindresorhus.com) - unique-random
// Useful for things like slideshows where you don't want to have the same slide twice in a row.

/*
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
