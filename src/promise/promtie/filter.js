'use strict'

var limitConcurrency = require('./util/limitConcurrency')

function filter (arr, fn, options) {
  options = options || {concurrency: Infinity}

  return Promise.all(arr)
  .then((arr) =>
    limitConcurrency(options.concurrency, arr.map((value, i, array) => () => fn(value, i, array)))
    .then(shouldFilter => arr.filter((value, i) => !!shouldFilter[i]))
  )
}

/*
  Iterates over the `array` and filters out the array values if they
  do not pass the function test.

  If called as `each(fn)` it returns a function that takes the array
  and returns the desired Promise.

*/

module.exports = (array, fn, options) => {
  if (typeof array === 'function') {
    fn = array
    return (array) => filter(array, fn, options)
  }

  return filter(array, fn, options)
}
