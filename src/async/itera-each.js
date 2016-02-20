'use strict'

const itera = require('./itera')
const map   = require('../array/map')
const ovals  = require('../object/values')
const isObject = require('../lang/isObject')

function asyncEach (items, iterator, done) {
  if (isObject(items)) items = ovals(items)
  if (typeof done !== 'function') done = function () {}

  let tasks

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

module.exports = asyncEach
