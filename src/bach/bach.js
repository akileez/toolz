var asyncDone = require('./asyncDone')
var nowAndLater = require('./nowAndLater')
var last = require('') // make last function
var initial = require('') // make initial function

var helpers = require('./helpers')

function buildSeries () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function series (done) {
    nowAndLater.mapSeries(args, asyncDone, extensions, done)
  }

  return series
}

function buildSettleSeries () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function settleSeries (done) {
    nowAndLater.mapSeries(args, asyncSettle, extensions, helpers.onSettled(done))
  }

  return settleSeries
}

function buildParallel () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function parallel (done) {
    nowAndLater.map(args, asyncDone, extensions, done)
  }

  return parallel
}

function buildSettleParallel () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function settleParallel (done) {
    nowAndLater.map(args, asyncSettle, extensions, helpers.onSettled(done))
  }

  return settleParallel
}

module.exports = {
  series: buildSeries,
  parallel: buildParallel,
  settleSeries: buildSettleSeries,
  settleParallel: buildSettleParallel
}