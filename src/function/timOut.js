function timout (ms) {
  return function (func) {
    return setTimeout(func, ms)
  }
}

module.exports = timout

/*
    var timo = require('timout')

    timo(4500)(function () {
      cb(null, 'stylez')
    })
*/
