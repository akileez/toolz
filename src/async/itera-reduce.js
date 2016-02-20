'use strict'

const itera = require('./itera')
const map   = require('../array/map')
const ovals  = require('../object/values')
const isObject = require('../lang/isObject')

/**
 Calls provided async iterator function with the accumulator and each item.
 When all items have been iterated over calls done with a possible error or the final value of the accumulator.

  * @name exports
  * @function
  *
  * @param items {Array} the items to be reduced
  * @param seed {T} the initial value that can be of any type and is passed along as the accumulator (acc) each time the iterator is called
  * @param iterator {Function} function (acc, item, callback) {} - the iterator called for each item
  * @param done {Function} function (err, acc) {} - called with final accumulated value or an error if one occurred

*/

function asyncReduce (items, seed, iterator, done) {
  if (isObject(items)) items = ovals(items)
  if (!Array.isArray(items)) throw new Error('items must be an Array')
  if (typeof iterator !== 'function') throw new Error('iterator must be a function')
  if (typeof done !== 'function') throw new Error('done must be a function')

  let tasks

  if (iterator.length === 4) tasks = map(items, (item, key) => {
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

  // var tasks = map(items, (item, key) => {
  //   return (acc, cb) => {
  //     if (len === 4) iterator(acc, item, key, cb)
  //     else iterator(acc, item, cb)
  //   }
  // })

  // var tasks = map(items, function (item) {
  //   return function (acc, cb) {
  //     iterator(acc, item, cb)
  //   }
  // })

  // var tasks = items.map(function (item) {
  //   return function (acc, cb) {
  //     iterator(acc, item, cb)
  //   }
  // })


}

module.exports = asyncReduce
