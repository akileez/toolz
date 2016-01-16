'use strict'

var apply = require('../../function/apply')
var ticky = require('./ticky')

module.exports = function debounce (fn, args, ctx) {
  if (!fn) return

  ticky(function run () {
    apply(fn, ctx || null, args || [])
  })
}
