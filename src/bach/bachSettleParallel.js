var asyncDone = require('./asyncDone')
var nowAndLater = require('./nowAndLater')
var last = require('') // make last function
var initial = require('') // make initial function

var helpers = require('./helpers')

function buildSettleParallel () {
  var args = helpers.verifyArguments(arguments)
  var extensions = helpers.getExtensions(last(args))

  if (extensions) args = initial(args)

  function settleParallel (done) {
    nowAndLater.map(args, asyncSettle, extensions, helpers.onSettled(done))
  }

  return settleParallel
}

module.exports = buildSettleParallel
