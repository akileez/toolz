'use strict'

const itera = require('./itera')
const map   = require('../array/map')
const øvals  = require('../object/values')
const isObject = require('../lang/isObject')

function asyncEach (items, iterator, done) {
  if (isObject(items)) items = øvals(items)
  if (typeof done !== 'function') done = function () {}

  let tasks

  if (iterator.length === 4) tasks = map(items, (item, key, items) => {
    return (cb) => {
      iterator(item, key, items, cb)
    }
  })

  if (iterator.length === 3) tasks = map(items, (item, key) => {
    return (cb) => {
      iterator(item, key, cb)
    }
  })

  else if (iterator.length === 2) tasks = map(items, (item) => {
    return (cb) => {
      iterator(item, cb)
    }
  })

  else tasks = map(items, (item) => {
    return (cb) => {
      iterator(cb)
    }
  })

  itera([]
    .concat(tasks)
    .concat(done)
  )
}

function concurEach (items, iterator, done) {
  const forEach = require('../array/forEach')

  if (isObject(items)) items = øvals(items)
  if (typeof done !== 'function') done = function () {}

  var tasks = map(items, (item, key) => {
    return (cb) => {
      iterator(item, key, cb)
    }
  })

  forEach(tasks, function (task) {
    itera(task, noop)
  })

  function noop () {
  }
}

module.exports = asyncEach
module.exports.concur = concurEach
