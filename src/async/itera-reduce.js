'use strict'

const assert   = require('../assertion/claim')
const itera    = require('./itera')
const map      = require('../array/map')
const øvals    = require('../object/values')
const isObject = require('../lang/isObject')

/**
 Calls the provided async iterator function with an accumulator and `each` item value.
 When all items have been iterated over, `done` is called with a possible error (reject)
 or the final value of the accumulator (response/result).

  * @name exports
  * @function

  * @param items {Array}
  * the items to be reduced
    takes arrays and objects. object property values will be converted to an array.

  * @param seed {Any}
  * the initial value
    can be of any type and is passed along as the accumulator (acc) each time the iterator is called

  * @param iterator {Function}
  * function (acc, item, callback) {} || (acc, item, callback) => {}
    the iterator called for each item

  * @param done {Function}
  * callback: function (err, acc) {} || (err, acc) => {}
    called with final accumulated value or an error if one occurred

*/

function asyncReduce (items, seed, iterator, done) {
  // param conversion
  if (isObject(items)) items = øvals(items)

  // check requirements
  assert.is(Array.isArray(items), true, 'items must be an array')
  assert.is(typeof iterator, 'function', 'iterator must be a function')
  assert.is(typeof done, 'function', 'done must be a function')

  let tasks

  // iterator parameters requirements
  if (iterator.length === 5) tasks = map(items, (item, key, items) => {
    return (acc, next) => {
      iterator(acc, item, key, items, next)
    }
  })

  else if (iterator.length === 4) tasks = map(items, (item, key) => {
    return (acc, next) => {
      iterator(acc, item, key, next)
    }
  })

  else tasks = map(items, (item) => {
    return (acc, next) => {
      iterator(acc, item, next)
    }
  })

  itera([itera.seed(seed)]
    .concat(tasks)
    .concat(done)
  )
}

module.exports = asyncReduce
