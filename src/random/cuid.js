
'use strict'

var namespace = 'cuid'
var c = 0
var blocksize = 4
var base = 36
var discreteValues = Math.pow(base, blocksize)

var pad = function pad (num, size) {
  var s = '000000000' + num
  return s.substr(s.length - size)
}

var randomBlock = function randomBlock () {
  return pad((Math.random() * discreteValues << 0)
    .toString(base), blocksize)
}

var safeCounter = function () {
  c = (c < discreteValues) ? c : 0
  c++
  return c - 1
}

function cuid () {
  // Starting with a lowercase letter makes
  // it HTML element ID friendly.
  var letter = 'c' // hard-coded allows for sequential access
  var timestamp = (new Date().getTime()).toString(base)
  var counter
  var finger = nodePrint()
  var random = randomBlock() + randomBlock()

  counter = pad(safeCounter().toString(base), blocksize)

  return (letter + timestamp + counter + finger + random)
}

function slug () {
  var counter
  var date = new Date().getTime().toString(36)
  var print = nodePrint().slice(0, 1) + nodePrint.slice(-1)
  var random = randomBlock().slice(-2)

  counter = safeCounter().toString(36).slice(-4)

  return date.slice(-2) + counter + print + random
}

function nodePrint () {
  var os = require('os')
  var padding = 2
  var pid = pad((process.pid).toString(36), padding)
  var hostname = os.hostname()
  var length = hostname.length
  var hostId = pad((hostname)
    .split('')
    .reduce(function (prev, char) {
      return +prev + char.charCodeAt(0)
    }, +length + 36)
    .toString(36), padding
  )

  return pid + hostId
}

// NOTE: browser code not in use in this library.

// function globalCount() {
//   // We want to cache the results of this
//   var cache = (function calc() {
//     var i
//     var count = 0

//     for (i in window) {
//       count++
//     }

//     return count
//   }());

//   return cache;
// }

// function browserPrint() {
//   return pad((navigator.mimeTypes.length
//     + navigator.userAgent.length).toString(36)
//     + globalCount().toString(36), 4);
// };

module.exports = cuid
module.exports.slug = slug

